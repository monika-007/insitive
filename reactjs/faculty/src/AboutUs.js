import { Component } from "react";
import { Link } from "react-router-dom";
import Header from './Header';
export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="bg-danger bg-opacity-25 gradient-background">
        <div className="container text-center py-5">
          <Header/>
          <h1 className="fw-bold">About Us</h1>
          <div className="row align-items-center mt-4">
            <div className="col-md-6 text-md-start">
              <h2 className="fw-bold">WHO ARE WE?</h2>
              <p className="lead">
                The INSITIVE streamlines feedback collection, analysis, and management, enabling students, faculty,
                and administrators to drive continuous improvement through data-backed decisions.
              </p>
            </div>
            <div className="col-md-6">
              <img src="../html/assets/img/feedback (1).png" alt="Students Illustration" className="img-fluid" />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-6">
              <img src="../html/assets/img/feedback (2).png" alt="Students Illustration" className="img-fluid" />
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
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-6 text-md-start">
              <h2 className="fw-bold display-5">WHAT WE OFFER?</h2>
              <p className="fs-5">INSITIVE is designed with multiple features to simplify the feedback process and enhance institutional efficiency.
                <br />
                For Students &amp; Faculty:  <br />
                🔹 Easy &amp; Quick Feedback Submission – Provide ratings and reviews for courses, faculty, and events effortlessly.  <br />
                🔹 Anonymous Feedback Option – Share honest opinions without hesitation.  <br />
                🔹 Track Feedback Status – Get updates on whether your feedback has been reviewed or addressed.  <br />
                🔹 Receive Notifications – Get alerts on improvements made based on collective feedback.  <br />
              </p>
            </div>
            <div className="col-md-6">
              <img src="../html/assets/img/feedback (3).png" alt="Students Illustration" className="img-fluid" />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-6">
              <img src="../html/assets/img/feedback (4).png" alt="Students Illustration" className="img-fluid" />
            </div>
            <div className="col-md-6 text-md-start">
              <h2 className="fw-bold display-5">WHY CHOOSE US ?</h2>
              <p className="fs-5">Our system eliminates the hassles of traditional feedback collection methods (paper forms, Excel sheets, verbal feedback) by providing a digital, organized, and efficient platform that ensures real results. <br />
                ✅ User-Friendly Interface – Simple and intuitive for all users.  <br />
                ✅ Data-Driven Decision Making – Helps institutions improve based on facts, not assumptions.  <br />
                ✅ Confidential &amp; Secure – Ensures privacy and data protection.  <br />
                ✅ Automated Processes – Saves time and effort for both students and administration.  <br />
                ✅ Customizable Feedback System – Institutions can modify it according to their needs.  <br />
              </p>
            </div>
            <Link className="btn-light" to="/dashboard">back</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            {/* Copyright */}
            <div className="copyright">
              <div className="row">
                <div className="col-md-12">
                  <div className="copyright-text text-center">
                    <p className="mb-0">© INSITIVE. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
      </div>


    );
  }
}