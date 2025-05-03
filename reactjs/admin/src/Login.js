import React , { Component } from "react";
import Footer from "./Footer";
import WithHook from "./hoc";
import axios from 'axios';
import { Link } from "react-router-dom";
import { showError, showNetworkError, showMessage } from "./message";
import { ToastContainer } from "react-toastify";
import { withCookies } from "react-cookie";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    updateValue = (event) => {
        this.setState({ [event.target.id]: event.target.value }, () => {
        });
    };

    doLogin = (e) => {
        e.preventDefault();
        console.log("Submitting Data:", {
            email: this.state.email,
            password: this.state.password
        });
        if (!this.state.email || !this.state.password) {
            showError("Email and Password are required!");
            return;
        }
      
        let apiAddress = "http://127.0.0.1:5000/admin/login";
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        console.log("Final FormData:", form); // Debugging

        axios({
            method: 'post',
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
          }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            if (error !== 'no')
              showError(error);
            else {
              let success = response.data[1]['success'];
              let message = response.data[2]['message'];
              if (success === 'no')
                showError(message);
              else {
                let userid = response.data[3]['id'];
                console.log(userid);
                showMessage(message);
                this.props.setCookie('userid',userid);
                console.log(this.props.cookies);
                setTimeout(() => {
                   this.props.navigate("/dashboard");
                }, 500);
              }
            }
          }).catch((error) => showNetworkError(error));
      }

    render() {
        return (
            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                    <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-600px position-xl-relative">
                        <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
                            <div className="d-flex flex-row-fluid flex-column text-center p-5 p-lg-10 pt-lg-20">
                                <Link to="/" className="py-2 py-lg-20">
                                <img alt="Logo" src="assets/media/logos/INSITIVE_2_-removebg-preview(1).png"
                                    style={{ maxHeight: '80px' }} className="logo-default theme-light-show" />
                                </Link>
                                <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                                    Welcome to INSITIVE
                                </h1>
                                <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                                    Keep up with the insides <br />
                                    with Insitive
                                </p>
                            </div>
                            <div className="d-none d-lg-block d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
                               style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/media/illustrations/sigma-1/17.png)`, display: 'block !important'}}>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    <div className="d-flex flex-column flex-lg-row-fluid py-10">
                        <div className="d-flex flex-center flex-column flex-column-fluid">
                            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                                <form className="form w-100" noValidate id="kt_sign_in_form" onSubmit={this.doLogin}>
                                    <div className="text-center mb-10">
                                        <h1 className="text-dark mb-3">
                                            Sign In to Insitive
                                        </h1>
                                    </div>

                                    <div className="fv-row mb-10">
                                        <label className="form-label fs-6 fw-bold text-dark">Email</label>
                                        <input
                                        id="email"
                                            className="form-control form-control-lg form-control-solid"
                                            value={this.state.email}
                                            onChange={this.updateValue}
                                            type="email"
                                            name="email"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="fv-row mb-10">
                                        <div className="d-flex flex-stack mb-2">
                                            <label className="form-label fw-bold text-dark fs-6 mb-0">Password</label>
                                            <Link to="/forgot_password" className="link-primary fs-6 fw-bold">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <input
                                            id="password"
                                            className="form-control form-control-lg form-control-solid"
                                            value={this.state.password}
                                            onChange={this.updateValue}
                                            type="password"
                                            name="password"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
                                            <span className="indicator-label">
                                                Continue
                                            </span>
                                            <span className="indicator-progress">
                                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(WithHook(Login));
