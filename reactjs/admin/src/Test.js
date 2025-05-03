import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        };
    }

    componentDidMount() {
        this.fetchTest();
    }

    fetchTest = () => {
        axios.get("http://127.0.0.1:5000/test_schedule")
            .then(response => {
                this.setState({ tests: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }
    handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this test?")) {
            axios.delete(`http://127.0.0.1:5000/test_schedule/${id}`)
                .then(() => {
                    alert("test deleted successfully!");
                    this.fetchTest();
                })
                .catch(error => console.error("Error deleting test:", error));
        }
    };


    render() {
        return (
            <>
                <div className="d-flex flex-column flex-root">
                    <div className="page d-flex flex-row flex-column-fluid">
                        <Asidemenu />
                        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                            <Header />
                            <div className="content fs-6 d-flex flex-column flex-column-fluid" id="kt_content">
                                <div className="container-fluid">
                                    <div className="row g-5 mb-3">
                                        <div className="col-xxl-8 col-xl-12 col-lg-12 mx-auto">
                                            <div className="card card-stretch mb-4">
                                                <div className="card-header border-0 pt-5 pb-3 d-flex justify-content-between align-items-center flex-wrap">
                                                    <h3 className="card-title fw-bolder text-gray-800 fs-2">Test Details</h3>
                                                    <Link to="/addtest" className="btn btn-light-primary btn-sm">Add</Link>
                                                </div>
                                                <div className="card-body py-0">
                                                    <div className="table-responsive">
                                                        <table className="table align-middle table-bordered table-hover text-center">
                                                            <thead className="text-uppercase text-gray-600 fw-bolder">
                                                                <tr>
                                                                    <th>Test Name</th>
                                                                    <th>Subject</th>
                                                                    <th>Date</th>
                                                                    <th>Duration</th>
                                                                    <th>Total Marks</th>
                                                                    <th>Operation</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.tests.length > 0 ? (
                                                                    this.state.tests.map((test, index) => (
                                                                        <tr key={index}>
                                                                            <td>{test.test_name}</td>
                                                                            <td>{test.title}</td>
                                                                            <td>{test.test_date}</td>
                                                                            <td>{test.duration}</td>
                                                                            <td>{test.total_marks}</td>
                                                                            <td>
                                                                                <Link to={`/edittest/${test.id}`} className="btn btn-light-primary btn-sm" style={{ marginRight: '10px' }}>Edit</Link>
                                                                                <button onClick={() => this.handleDelete(test.id)} className="btn btn-light-danger btn-sm" style={{ marginRight: '10px' }}>Delete</button>

                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="6" className="text-center">
                                                                            No test data available
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
