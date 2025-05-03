import React, { Component } from "react";
import Header from "./Header";
import Footer from './Footer';
import Asidemenu from "./Asidemenu";
import axios from 'axios';

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = { feedback: [] };
    }

    componentDidMount() {
        let apiAddress = "http://127.0.0.1:5000/feedback";
        axios.get(apiAddress)
            .then(response => {
                this.setState({ feedback: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again.');
            });
    }
    renderStars(rating) {
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return filledStars + emptyStars;
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
                                <div id="feedbackFeed" className="mt-4">
                                    <h3 className="p-5">Feedbacks</h3>
                                    {this.state.feedback.length > 0 ? (
                                        this.state.feedback.map((item, index) => (
                                            <div key={index} className="card p-4 mb-4 mx-3">
                                                <div className="d-flex align-items-center">
                                                    <strong>{item.first_name + " " + item.last_name}</strong>
                                                </div>
                                                <div className="mt-3">{item.review}</div>
                                                <div className="rating" style={{
                                                    color: " gold"
                                                }}>
                                                    {this.renderStars(item.rating)}
                                                </div>
                                            </div>

                                        ))
                                    ) : (
                                        <p className="text-center">No feedback available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div >
            </>
        );
    }
}
