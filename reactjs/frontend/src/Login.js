import { Component } from "react";
import { Link } from "react-router-dom";
import WithHook from "./hoc";
import axios from 'axios';
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

        let apiAddress = "http://127.0.0.1:5000/users/login";
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
                    this.props.setCookie('userid', userid);
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
            <div className="main-wrapper">
                {/* Header */}
                <header className="header">
                    <div className="header-fixed">
                        <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
                            <div className="container d-flex justify-content-center">
                                <div className="navbar-header">
                                    <div className="navbar-brand logo">
                                        <img src="assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <ToastContainer/>
                {/* /Header */}
                {/* Home Banner */}
                <section className="section latest-blog">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <h3 className="text-center mb-4">Login</h3>
                                        <form onSubmit={this.doLogin}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email address</label>
                                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" value={this.state.email}
                                                    onChange={this.updateValue} />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <span className=" text-dark fs-6">Password</span>
                                                <Link to="/forgot_password" className="link-primary fs-10 fw-bold">
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <input type="password" className="form-control mb-3" name="password" id="password" placeholder="Enter password" value={this.state.password}
                                            onChange={this.updateValue}  />
                                            <button type="submit" className="btn btn-light-danger mb-2 w-100">Login</button>
                                        </form>
                                        <p className="text-center">Don't have an account? <Link to="/register">Sign up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            {/* Copyright */}
                            <div className="copyright">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="copyright-text text-center">
                                            <p className="mb-0">© INSITIVE. All rights reserved.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Copyright */}
                        </div>
                    </div>
                </section>
                {/* /Latest Blog */}
            </div>


        );
    }
}
export default withCookies(WithHook(Login));