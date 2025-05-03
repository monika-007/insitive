import React, { Component } from "react";
export default class PageNotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className="main-wrapper">
                    <div className="error-box">
                        <div className="error-logo">
                            <a href="index-2.html">
                                <img src="assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                            </a>
                        </div>
                        <h3 className="h2 mb-3"> Oh No! Error 404</h3>
                        <p className="h4 font-weight-normal">This page you requested counld not found. May the force be with you!</p>
                        <a href="user_index.html" className="btn btn-primary">Back to Home</a>
                    </div>
                </div>

            </>
        );
    }
}