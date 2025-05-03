import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import axios from 'axios';

export default class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Faculty: []
        };
    }

    componentDidMount() {
        const apiAddress = "http://127.0.0.1:5000/users/faculty";
        axios.get(apiAddress)
            .then(response => {
                this.setState({ Faculty: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }

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
                                                    <h3 className="card-title fw-bolder text-gray-800 fs-2">Faculty List</h3>
                                                    
                                                </div>
                                                <div className="card-body py-0">
                                                    <div className="table-responsive">
                                                        <table className="table align-middle table-bordered table-hover text-center">
                                                            <thead className="text-uppercase text-gray-600 fw-bolder">
                                                                <tr>
                                                                    <th>First Name</th>
                                                                    <th>Last Name</th>
                                                                    <th>Email</th>
                                                                    <th>Created At</th>
                                                                   
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.Faculty.length > 0 ? (
                                                                    this.state.Faculty.map((Faculty, index) => (
                                                                        <tr key={index}>
                                                                            <td>{Faculty.first_name}</td>
                                                                            <td>{Faculty.last_name}</td>
                                                                            <td>{Faculty.email}</td>
                                                                            <td>{Faculty.created_at}</td>
                                                                           
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="5" className="text-center">
                                                                            No faculty available
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
