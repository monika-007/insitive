import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div> <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2 text-md-start">
                            <img src="assets/media/logos/min-insitive-logo.svg" alt="file missing" className="img-fluid rounded w-50 h-50">
                            </img>
                        </div>
                        <div className="col-lg-6 text-md-end">
                            <h1 className="fw-bold display-3">About Us</h1>
                        </div>


                    </div>
                </div>

                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-md-start">
                                <h2 className="fw-bold display-5">WHO ARE WE?</h2>
                                <p className="fs-5">The INSITIVE streamlines feedback collection, analysis, and management, enabling students, faculty, and administrators to drive continuous improvement through data-backed decisions.   </p>
                            </div>
                            <div className="col-md-6 text-md-start">

                                <img src="assets/media/illustrations/sigma-1/Tommy_Parker___Synergy_Art_-_Illustration_Agency-removebg-preview.png" alt="file missing" className="img-fluid rounded"></img>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <img src="assets/media/illustrations/sigma-1/Analytics-removebg-preview.png" alt="file missing" className="img-fluid rounded"></img>

                            </div>
                            <div className="col-md-6 text-md-start">
                                <h2 className="fw-bold display-5">OUR MISSION</h2>
                                <p className="fs-5">At INSITIVE, our mission is to create a transparent, efficient, and insightful feedback system that benefits all stakeholders in an academic institution.<br /> We aim to: <br />
                                    ✔ Provide a seamless feedback submission process forusers.  <br />
                                    ✔ Enable institutions to make data-driven decisions based on feedback analysis.   <br />
                                    ✔ Foster continuous improvement in education quality, course delivery, and event management.  <br />
                                    ✔ Bridge the gap between students, faculty, and administrators through structured feedback.   <br />
                                    ✔ Promote a culture of open communication and accountability within academic environments.   <br />
                                </p>

                            </div>
                        </div> <div className="row align-items-center">
                            <div className="col-md-6 text-md-start">
                                <h2 className="fw-bold display-5">WHAT WE OFFER?</h2>
                                <p className="fs-5">INSITIVE is designed with multiple features to simplify the feedback process and enhance institutional efficiency.
                                    <br />
                                    For Students & Faculty:  <br />
                                    🔹 Easy & Quick Feedback Submission – Provide ratings and reviews for courses, faculty, and events effortlessly.  <br />
                                    🔹 Anonymous Feedback Option – Share honest opinions without hesitation.  <br />
                                    🔹 Track Feedback Status – Get updates on whether your feedback has been reviewed or addressed.  <br />
                                    🔹 Receive Notifications – Get alerts on improvements made based on collective feedback.  <br />
                                </p>
                            </div>
                            <div className="col-md-6 text-md-start">

                                <img src="assets/media/illustrations/sigma-1/Healthcare_Mobile_App_Development__Why__How__and_How_Much_1_-removebg-preview.png" alt="file missing" className="img-fluid rounded"></img>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <img src="assets/media/illustrations/sigma-1/JhwvJ3bY-removebg-preview.png" alt="file missing" className="img-fluid rounded"></img>

                            </div>
                            <div className="col-md-6 text-md-start">
                                <h2 className="fw-bold display-5">WHY CHOOSE US ?</h2>
                                <p className="fs-5">Our system eliminates the hassles of traditional feedback collection methods (paper forms, Excel sheets, verbal feedback) by providing a digital, organized, and efficient platform that ensures real results. <br />

                                    ✅ User-Friendly Interface – Simple and intuitive for all users.  <br />
                                    ✅ Data-Driven Decision Making – Helps institutions improve based on facts, not assumptions.  <br />
                                    ✅ Confidential & Secure – Ensures privacy and data protection.  <br />
                                    ✅ Automated Processes – Saves time and effort for both students and administration.  <br />
                                    ✅ Customizable Feedback System – Institutions can modify it according to their needs.  <br />

                                </p>

                            </div>
                        </div>
                    </div>

                    <footer className="mt-auto py-3 w-100 text-center">
                        <Link to="/dashboard" className="btn btn-light-primary btn-sm">Back to Home</Link>

                        <p className="mb-0">&copy; 2025 INSITIVE. All rights reserved.</p>
                    </footer></div>
            </>
        );
    }
}