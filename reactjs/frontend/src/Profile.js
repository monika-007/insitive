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
            <div className="main-wrapper">
                {/* Header */}
                <Header/>
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
                                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
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
                            {/* sidebar */}
                            <div className="col-xl-3 col-lg-3 ">
                                <div className="settings-widget account-settings">
                                    <div className="settings-menu">
                                        <h3>Dashboard</h3>
                                        <ul style={{ padding: 4, margin: 4 }}>
                                            <li className="nav-item ">
                                                <Link to="/assignment" className="nav-link">
                                                    <i className="bx bxs-tachometer" />Assignments
                                                </Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link to="/test" className="nav-link">
                                                    <i className="bx bxs-user" />Test Schedule
                                                </Link>
                                            </li>
                                            <li className="nav-item mb-2">
                                                <Link to="/mark" className="nav-link" >
                                                    <i className="bx bxs-graduation" /> Marks
                                                </Link>
                                            </li>
                                        </ul>
                                        <h3>Account Settings</h3>
                                        <ul  style={{ padding: 0, margin: 0 }}>
                                            <li className="nav-item">
                                                <Link to="/change_password" className="nav-link ">
                                                    <i className="bx bxs-cog" />change password
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/forgot_password" className="nav-link">
                                                    <i className="bx bxs-log-out" />forgot password
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/logout" className="nav-link">
                                                    <i className="bx bxs-log-out" />Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* /Sidebar */}
                            {/* Student Profile */}
                            <div className="col-xl-9 col-lg-9">
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
                            {/* Student Profile */}
                        </div>
                    </div>
                </div> 
              </div>

                {/* /Page Content */}
                {/* Footer */}
                <Footer/>
                {/* /Footer */}
           
         </div>
        );
    }
}

export default WithHook(Profile);

