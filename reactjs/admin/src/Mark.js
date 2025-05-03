import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: []
        };
    }

    componentDidMount() {
        this.fetchMark();
    }

    fetchMark = () => {
        axios.get( "http://127.0.0.1:5000/marks")
            .then(response => {
                this.setState({ marks: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }
    handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this mark?")) {
            axios.delete(`http://127.0.0.1:5000/marks/${id}`)
                .then(() => {
                    alert("mark deleted successfully!");
                    this.fetchMark();
                })
                .catch(error => console.error("Error deleting mark:", error));
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
                                                    <h3 className="card-title fw-bolder text-gray-800 fs-2">Marks List</h3>
                                                    <Link to="/addmarks" className="btn btn-light-primary btn-sm">Add</Link>
                                                </div>
                                                <div className="card-body py-0">
                                                    <div className="table-responsive">
                                                        <table className="table align-middle table-bordered table-hover text-center">
                                                            <thead className="text-uppercase text-gray-600 fw-bolder">
                                                                <tr>
                                                                    <th>Student Name</th>
                                                                    <th>Test Name</th>
                                                                    <th>Marks Obtained</th>
                                                                    <th>Graded At</th>
                                                                    <th>Operation</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.marks.length > 0 ? (
                                                                    this.state.marks.map((mark, index) => (
                                                                        <tr key={index}>
                                                                            <td>{mark.first_name +" "+ mark.last_name}</td>
                                                                            <td>{mark.test_name}</td>
                                                                            <td>{mark.marks_obtained}</td>
                                                                            <td>{mark.graded_at}</td>
                                                                            <td>
                                                                                <Link to={`/editmark/${mark.id}`} className="btn btn-light-primary btn-sm" style={{ marginRight: '10px' }}>Edit</Link>
                                                                                <button onClick={() => this.handleDelete(mark.id)} className="btn btn-light-danger btn-sm" style={{ marginRight: '10px' }}>Delete</button>                              
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="5" className="text-center">
                                                                            No marks available
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
