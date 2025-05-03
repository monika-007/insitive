import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header"; 
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="main-wrapper">
            {/* Header */}
            <Header/>
            {/* /Header */}
            {/* Home Banner */}
            <section className="home-slide d-flex align-items-center">
              <div className="container">
                <div className="row ">
                  <div className="col-md-7">
                    <div className="home-slide-face aos" data-aos="fade-up">
                      <div className="home-slide-text ">
                        <h5>Seamless Communication,<br /> Smarter Feedback</h5>
                        <h1>Empowering Growth Through Insights</h1>
                        <p>Capture valuable feedback, enhance experiences, and drive meaningful change-all in
                          one place. Stay connected, make informed decisions, and grow together.</p>
                        <h4>Simple. Smart. Effective.</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="girl-slide-img aos" data-aos="fade-up">
                      <img src="assets/img/1.png" alt="Img" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /Home Banner */}
            <section className="section student-course">
              <div className="container">
                <div className="course-widget">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="course-full-width">
                        <div className="blur-border course-radius align-items-center aos" data-aos="fade-up">
                          <div className="online-course d-flex align-items-center">
                            <div className="course-img">
                              <img src="assets/img/pencil-icon.svg" alt="Img" />
                            </div>
                            <div className="course-inner-content">
                              <h4><span>90</span>%+</h4>
                              <p>positive feedbacks</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 d-flex">
                      <div className="course-full-width">
                        <div className="blur-border course-radius aos" data-aos="fade-up">
                          <div className="online-course d-flex align-items-center">
                            <div className="course-img">
                              <img src="assets/img/cources-icon.svg" alt="Img" />
                            </div>
                            <div className="course-inner-content">
                              <h4><span>60</span>+</h4>
                              <p>Expert Tutors</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 d-flex">
                      <div className="course-full-width">
                        <div className="blur-border course-radius aos" data-aos="fade-up">
                          <div className="online-course d-flex align-items-center">
                            <div className="course-img">
                              <img src="assets/img/certificate-icon.svg" alt="Img" />
                            </div>
                            <div className="course-inner-content">
                              <h4><span>6</span>K+</h4>
                              <p>Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 d-flex">
                      <div className="course-full-width">
                        <div className="blur-border course-radius aos" data-aos="fade-up">
                          <div className="online-course d-flex align-items-center">
                            <div className="course-img">
                              <img src="assets/img/gratuate-icon.svg" alt="Img" />
                            </div>
                            <div className="course-inner-content">
                              <h4><span>60</span>K +</h4>
                              <p>Students</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Home Banner */}
            {/* Master Skill */}
            <section className="section master-skill">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-12">
                    <div className="section-header aos" data-aos="fade-up">
                      <div className="section-sub-head">
                        <span>What’s New</span>
                        <h2>Enhance Learning with Smarter Feedback</h2>
                      </div>
                    </div>
                    <div className="section-text aos" data-aos="fade-up">
                      <p>Optimize offline studying with a seamless feedback management system. Track progress,
                        gain insights, and refine learning strategies—whether you're a student or an educator.
                      </p>
                    </div>
                    <div className="career-group aos" data-aos="fade-up">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 d-flex">
                          <div className="certified-group blur-border d-flex">
                            <div className="get-certified d-flex align-items-center">
                              <div className="blur-box">
                                <div className="certified-img ">
                                  <img src="assets/img/icon-1.svg" alt="Img" className="img-fluid" />
                                </div>
                              </div>
                              <p>Stay motivated with engaging instructors</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-flex">
                          <div className="certified-group blur-border d-flex">
                            <div className="get-certified d-flex align-items-center">
                              <div className="blur-box">
                                <div className="certified-img ">
                                  <img src="assets/img/icon-2.svg" alt="Img" className="img-fluid" />
                                </div>
                              </div>
                              <p>Keep up with in the latest in cloud</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-flex">
                          <div className="certified-group blur-border d-flex">
                            <div className="get-certified d-flex align-items-center">
                              <div className="blur-box">
                                <div className="certified-img ">
                                  <img src="assets/img/icon-3.svg" alt="Img" className="img-fluid" />
                                </div>
                              </div>
                              <p>Get certified with certification courses</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-flex">
                          <div className="certified-group blur-border d-flex">
                            <div className="get-certified d-flex align-items-center">
                              <div className="blur-box">
                                <div className="certified-img ">
                                  <img src="assets/img/icon-4.svg" alt="Img" className="img-fluid" />
                                </div>
                              </div>
                              <p>Build skills your way, from labs to courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12 d-flex align-items-end">
                    <div className="career-img aos" data-aos="fade-up">
                      <img src="assets/img/3.png" alt="Img" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /Master Skill */}
            {/* Share Knowledge */}
            <section className="home-slide d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="knowledge-img aos" data-aos="fade-up">
                      <img src="assets/img/share.png" alt="Img" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className="join-mentor aos" data-aos="fade-up">
                      <h2>Why choose us?</h2>
                      <p>Shaping the future of education with excellence and innovation. Our institution is
                        dedicated to providing a high-quality learning environment, experienced faculty, and a
                        student-centric approach to education. We believe in fostering knowledge, creativity,
                        and growth to prepare students for success.</p>
                      <ul className="course-list">
                        <li><i className="fa-solid fa-circle-check" /> Best Courses</li>
                        <li><i className="fa-solid fa-circle-check" /> Experienced Faculty</li>
                        <li><i className="fa-solid fa-circle-check" /> Personalized Learning Approach</li>
                        <li><i className="fa-solid fa-circle-check" /> Strong Alumni Network</li>
                      </ul>
                    </div>
                  </div>
                  <div className="container text-center">
                    <img src="assets/img/qute.png" alt="Img" style={{"width":"50px","height":"auto","margin-bottom":"20px"}} />
                    <p style={{"font-size":"22px","color":"#444","font-style":"italic","line-height":"1.6","max-width":"700px","margin":"auto"}}>
                      <span style={{"font-size":"30px","color":"#ff6b00"}}>“</span>
                      Life is not about waiting for the storm to pass, but about learning to dance in the rain.
                      <span style={{"font-size":"30px","color":"#ff6b00"}}>”</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* /Share Knowledge */}
            {/* Footer */}
            <Footer/>
            {/* /Footer */}
          </div>
          
        );
    }
}

