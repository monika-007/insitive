import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showError, showMessage, showNetworkError } from "./message";
import { ToastContainer } from "react-toastify";
import WithHook from "./hoc";
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }

    updateValue = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email } = this.state;

        if (!email) {
            showError("Email is required.");
            return;
        }

        axios.get("http://127.0.0.1:5000/admin", {
            params: {
                email: email
            }
        }).then((response) => {
            const data = response.data;

            if (data[0].error !== 'no') {
                showError(data[0].error);
            } else {
                const success = data[1]?.success;
                const message = data[2]?.message;

                if (success === 'no') {
                    showError(message);
                } else {
                    showMessage(message);
                    this.setState({ email: "" });
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
                                <Link to="/dashboard" className="py-2 py-lg-20">
                                    <img alt="Logo" src="assets/media/logos/INSITIVE_2_-removebg-preview(1).png"
                                        style={{
                                            maxHeight: '70px',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto'
                                        }} className="logo-default theme-light-show" />
                                </Link>
                                <ToastContainer/>
                                <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                                    Welcome to Insitive
                                </h1>
                                <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                                    Keep up with the insides <br />
                                    with Insitive
                                </p>
                            </div>
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
                                            Forgot Password ?
                                        </h1>
                                        <div className="text-gray-400 fw-semibold fs-4">
                                            Enter your email to reset your password.
                                        </div>
                                    </div>

                                    <div className="fv-row mb-10">
                                        <label className="form-label fw-bold text-gray-900 fs-6">Email</label>
                                        <input
                                            className="form-control form-control-solid"
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.updateValue}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                                        <button type="submit" id="kt_password_reset_submit" className="btn btn-lg btn-primary fw-bold me-4">
                                            <span className="indicator-label">
                                                Submit
                                            </span>
                                            <span className="indicator-progress">
                                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                            </span>
                                        </button>
                                        <Link to="/" className="btn btn-lg btn-light-primary fw-bold">Cancel</Link>
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
export default WithHook(ForgotPassword);
