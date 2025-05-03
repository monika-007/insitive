import { Component } from "react";
import axios from 'axios';
import { showError, showMessage, showNetworkError } from "./message";
import { ToastContainer } from "react-toastify";
import { withCookies } from "react-cookie";
import WithHook from "./hoc";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "faculty"
    };
  }

  updateValue = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  doRegister = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, confirmPassword, role } = this.state;

    if (!first_name || !last_name || !email || !password || !confirmPassword || !role) {
      showError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    const apiAddress = "http://127.0.0.1:5000/users"; // Your backend route
    const form = new FormData();
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    form.append("email", email);
    form.append("password", password);
    form.append("role", role);

    axios({
      method: 'post',
      responseType: 'json',
      url: apiAddress,
      data: form,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      let error = response.data[0]?.error;
      if (error !== 'no') {
        showError(error);
      } else {
        let success = response.data[1]?.success;
        let message = response.data[2]?.message;
        if (success === 'no') {
          showError(message);
        } else {
          showMessage(message);
          setTimeout(() => {
            this.props.navigate("/");
          }, 1000);
        }
      }
    }).catch((err) => showNetworkError(err));
  };

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
        <ToastContainer />
        {/* /Header */}
        {/* Home Banner */}
        <section className="section latest-blog">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h3 className="text-center mb-4">Register</h3>
                    <form onSubmit={this.doRegister}>
                      <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" placeholder="Enter your first name" value={this.state.first_name} onChange={this.updateValue} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" placeholder="Enter your last name" value={this.state.last_name} onChange={this.updateValue} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={this.state.email} onChange={this.updateValue} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" value={this.state.password} onChange={this.updateValue} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={this.state.confirmPassword} onChange={this.updateValue} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-control" id="role" value={this.state.role} onChange={this.updateValue}>
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-light-danger mb-2 w-100">Sign Up</button>
                    </form>

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
export default withCookies(WithHook(Register));
