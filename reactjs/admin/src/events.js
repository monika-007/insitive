import React, { Component } from "react";
import Header from "./Header";
import Footer from './Footer';
import Asidemenu from "./Asidemenu";
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.fetchEvent();
    }

    fetchEvent = () => {
        axios.get( "http://127.0.0.1:5000/events")
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }

    handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            axios.delete(`http://127.0.0.1:5000/events/${id}`)
                .then(() => {
                    alert("event deleted successfully!");
                    this.fetchEvent();
                })
                .catch(error => console.error("Error deleting event:", error));
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
                                <div className="post fs-6 d-flex flex-column-fluid" id="kt_post">
                                    <div className="container-xxl">
                                        <div className="container mt-4">
                                        <div className="card-header border-0 pt-5 pb-3 d-flex justify-content-between align-items-center flex-wrap">
                                                    <h3 className="card-title fw-bolder text-gray-800 fs-2">
                                                        Event details
                                                    </h3>
                                                    <Link to="/event/add" className="btn btn-light-primary btn-sm">Add</Link>
                                                </div>
                                            <div className="row">
                                                {this.state.events.length > 0 ? (
                                                    this.state.events.map((event, index) => (
                                                        <div key={index} className="col-12">
                                                            <div className="card mb-3 p-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div>
                                                                        <strong>{event.name}</strong><br />
                                                                        <span className="text-muted">{event.date}</span><br />
                                                                        <p>{event.description}</p>
                                                                        <Link to={`/event/edit/${event.id}`} className="btn btn-light-primary btn-sm" style={{ marginRight: '10px' }}>Edit</Link>
                                                                        <button className="btn btn-light-danger btn-sm" onClick={() => this.handleDelete(event.id)} style={{ marginRight: '10px' }}>Delete</button>                                                                       
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-12">
                                                        <p className="text-center">No events available</p>
                                                    </div>
                                                )}
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
