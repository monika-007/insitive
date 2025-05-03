import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import WithHook from "./hoc";
import { Link } from "react-router-dom";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        const id = this.props.cookies.userid;
        axios
            .get(`http://127.0.0.1:5000/users/user/${id}`)
            .then((response) => {
                console.log("Fetched user:", response.data);
                this.setState({ user: response.data });
            })
            .catch((error) => {
                console.log("Error fetching user:", error);
            });
    }

    render() {
        return (
            <>
                {/* Main Wrapper */}
                <div className="main-wrapper">
                    {/* Header */}
                    <Header />
                    {/* /Header */}
                    {/* Breadcrumb */}
                    <div className="breadcrumb-bar breadcrumb-bar-info">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-12">
                                    <div className="breadcrumb-list">
                                        <h2 className="breadcrumb-title">My Profile</h2>
                                        <nav aria-label="breadcrumb" className="page-breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">My Profile</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Breadcrumb */}
                    {/* Page Content */}
                    <div className="page-content">
                        <div className="container">
                            <div className="row">
                                {/*  Profile */}
                                <div className="col-xl-12 col-lg-12">
                                    <div className="settings-widget card-details mb-0">
                                        <div className="settings-menu p-0">
                                            <div className="profile-heading">
                                                <h3>My Profile</h3>
                                            </div>
                                            <div className="checkout-form personal-address">
                                                <div className="row">
                                                    {this.state.user ? (
                                                        <div className="col-sm-6">
                                                            <div className="contact-info">
                                                                <h6>First Name</h6>
                                                                <p>{this.state.user.first_name}</p>
                                                            </div>
                                                            <div className="contact-info">
                                                                <h6>Last Name</h6>
                                                                <p>{this.state.user.last_name}</p>
                                                            </div>
                                                            <div className="contact-info">
                                                                <h6>Email</h6>
                                                                <p>{this.state.user.email}</p>
                                                            </div>

                                                            <div>
                                                                <h4>Account Settings</h4>
                                                                <ul>
                                                                    <li><Link to="/change_password">Change Password</Link></li>
                                                                    <br />
                                                                    <li><Link to="/forgot_password">Forgot Password</Link></li>
                                                                    <br />
                                                                    <li><Link to="/logout">Logout</Link></li>
                                                                    <br />
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-3">
                                                            <h6>No profile data available</h6>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  Profile */}
                            </div>
                        </div>
                    </div>
                    {/* /Page Content */}
                    {/* Footer */}
                    <Footer />
                    {/* /Footer */}
                </div>
                {/* /Main Wrapper */}
            </>
        );
    }
}
export default WithHook(Profile);
