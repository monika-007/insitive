import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Asidemenu from "./Asidemenu";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignment: []
        };
    }

    componentDidMount() {
        this.fetchAssignment();
    }

    fetchAssignment = () => {
        axios.get("http://127.0.0.1:5000/assignment")
            .then(response => {
                this.setState({ assignment: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }

    handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            axios.delete(`http://127.0.0.1:5000/assignment/${id}`)
                .then(() => {
                    alert("assignment deleted successfully!");
                    this.fetchAssignment();
                })
                .catch(error => console.error("Error deleting assignment:", error));
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
                                                    <h3 className="card-title fw-bolder text-gray-800 fs-2">
                                                        Assignment List
                                                    </h3>
                                                    <Link to="/addassignment" className="btn btn-light-primary btn-sm">Add</Link>
                                                </div>
                                                <div className="card-body py-0">
                                                    <div className="table-responsive">
                                                        <table className="table align-middle table-bordered table-hover text-center">
                                                            <thead className="text-uppercase text-gray-600 fw-bolder">
                                                                <tr>
                                                                    <th>Title</th>
                                                                    <th>Subject</th>
                                                                    <th>Description</th>
                                                                    <th>Due Date</th>
                                                                    <th>Total Marks</th>
                                                                    <th>Operation</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.assignment.length > 0 ? (
                                                                    this.state.assignment.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{item.Name}</td>
                                                                            <td>{item.title}</td>
                                                                            <td>{item.description}</td>
                                                                            <td>{item.due_date}</td>
                                                                            <td>{item.total_marks}</td>
                                                                            <td>
                                                                            <Link to={`/editassignment/${item.id}`} className="btn btn-light-primary btn-sm" style={{ margin: '3px' }}>Edit</Link>
                                                                                <button onClick={() => this.handleDelete(item.id)} className="btn btn-light-danger btn-sm" style={{ margin: '3px' }}>Delete</button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="6" className="text-center">
                                                                            No assignments available
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
