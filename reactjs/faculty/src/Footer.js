import { Component } from "react";
import { Link } from "react-router-dom";
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <footer className="footer" id="footer">
            {/* Footer Top */}
            <div className="footer-top aos" data-aos="fade-up">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-about">
                      <div className="footer-logo">
                        <img src="/assets/img/insitive-light-fina_.svg" alt="logo" />
                      </div>
                      <div className="footer-about-content">
                        <p>Big thanks for your feedback! We’re always looking to improve, and your input
                          makes a difference. You’re awesome!</p>
                      </div>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-contact">
                      <div className="footer-contact-info">
                        <div className="footer-address">
                          <img src="/assets/img/icon-20.svg" alt="Img" className="img-fluid" />
                          <p> Institute of Technology
                            123,<br /> Knowledge Park, Sector 5
                            Bangalore,<br /> Karnataka - 560103
                            India</p>
                        </div>
                        <p>
                          <img src="/assets/img/icon-19.svg" alt="Img" className="img-fluid" />
                          <Link to="../cdn-cgi/l/email-protection.html" className="__cf_email__" data-cfemail="f5918790949886999886b5908d9498859990db969a98">[email&nbsp;protected]</Link>
                        </p>
                        <p className="mb-0">
                          <img src="/assets/img/icon-21.svg" alt="Img" className="img-fluid" />
                          +19 123-456-7890
                        </p>
                      </div>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                </div>
              </div>
            </div>
            {/* /Footer Top */}
            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="container">
                {/* Copyright */}
                <div className="copyright">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="copyright-text">
                        <p className="mb-0">© 2024 DreamsLMS. All rights reserved.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Copyright */}
              </div>
            </div>
            {/* /Footer Bottom */}
          </footer>

        );
    }
}