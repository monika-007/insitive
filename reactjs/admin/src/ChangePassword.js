import React, { Component } from "react";
import WithHook from "./hoc";
import axios from 'axios';
import { Link } from "react-router-dom";
import { showError, showNetworkError, showMessage } from "./message";
import { ToastContainer } from "react-toastify";
import { withCookies } from "react-cookie";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
        };
    }

    updateValue = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
    
        const { oldpassword, newpassword, confirmpassword } = this.state;
        const id = this.props.cookies.userid; 
    
        if (!id) {
            showError("User ID is missing. Please log in again.");
            return;
        }
    
        if (!oldpassword || !newpassword || !confirmpassword) {
            showError("All fields are required.");
            return;
        }
    
        if (newpassword !== confirmpassword) {
            showError("New passwords do not match.");
            return;
        }
    
        let apiAddress = "http://127.0.0.1:5000/admin"; // update path if needed
        let form = new FormData();
        form.append("id", id);
        form.append("oldpassword", oldpassword);
        form.append("newpassword", newpassword);
    
        axios({
            method: 'post',
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } //
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            if (error && error !== 'no') {
                showError(error);
            } else {
                let success = response.data[1]['success'];
                let message = response.data[2]['message'];
                if (success === 'no') {
                    showError(message);
                } else {
                    showMessage(message);
                    this.setState({
                        oldpassword: "",
                        newpassword: "",
                        confirmpassword: ""
                    });
                    setTimeout(() => {
                        this.props.navigate("/"); // optional redirect
                    }, 5000);
                }
            }
        }).catch((error) => {
            showNetworkError(error);
        });
    };
    
    render() {
        return (

            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                    <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-600px position-xl-relative">
                        <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
                            <div className="d-flex flex-row-fluid flex-column text-center p-5 p-lg-10 pt-lg-20">
                                <img alt="Logo" src="assets/media/logos/INSITIVE_2_-removebg-preview(1).png"
                                    style={{
                                        maxHeight: '70px',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: '0 auto'
                                    }} className="logo-default theme-light-show" />

                                <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                                    Welcome to insitive
                                </h1>

                                <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                                    Keep up with the insides <br />
                                    with insitive
                                </p>
                            </div>
                            <ToastContainer />
                            <div
                                className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom"
                                style={{
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/media/illustrations/sigma-1/17.png)`,
                                    minHeight: '100px',
                                    height: '100%', // Ensure it takes up the full height
                                    display: 'flex', // Ensure flex behavior works properly
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center bottom',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                            </div>

                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row-fluid py-10">
                        <div className="d-flex flex-center flex-column flex-column-fluid">
                            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                                <form className="form w-100" noValidate id="kt_password_reset_form" onSubmit={this.handleSubmit}>
                                    <div className="text-center mb-10">
                                        <h1 className="text-dark mb-3">
                                            Change Password
                                        </h1>
                                        <div className="text-gray-400 fw-semibold fs-4">
                                            Enter your old password.
                                        </div>
                                    </div>

                                    <div className="fv-row mb-10">
                                        <label className="form-label fw-bold text-gray-900 fs-6">Enter Old Password</label>
                                        <input
                                            id="oldpassword"
                                            className="form-control form-control-solid"
                                            type="password"
                                            name="oldpassword"
                                            value={this.state.oldpassword}
                                            onChange={this.updateValue}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="fv-row mb-10">
                                        <label className="form-label fw-bold text-gray-900 fs-6">Enter New Password</label>
                                        <input
                                            id="newpassword"
                                            className="form-control form-control-solid"
                                            type="password"
                                            name="newpassword"
                                            value={this.state.newpassword}
                                            onChange={this.updateValue}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="fv-row mb-10">
                                        <label className="form-label fw-bold text-gray-900 fs-6">Confirm Password</label>
                                        <input
                                            id="confirmpassword"
                                            className="form-control form-control-solid"
                                            type="password"
                                            name="confirmpassword"
                                            value={this.state.confirmpassword}
                                            onChange={this.updateValue}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                                        <button type="submit" id="kt_password_reset_submit"
                                            className="btn btn-lg btn-primary fw-bold me-4">
                                            <span className="indicator-label">
                                                Submit
                                            </span>
                                            <span className="indicator-progress">
                                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                            </span>
                                        </button>
                                        <Link to="/dashboard" className="btn btn-lg btn-light-primary fw-bold">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
                            <div className="d-flex flex-center fw-semibold fs-6">
                                <Link to="/about" className="text-muted text-hover-primary px-2" target="_blank" rel="noreferrer">About</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WithHook(ChangePassword);
