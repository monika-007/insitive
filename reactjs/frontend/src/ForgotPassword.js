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
      <div className="main-wrapper">
        <div className="row">
          {/* Login Banner */}
          <div className="col-md-6 login-bg">
            <div className="owl-carousel login-slide owl-theme aos" data-aos="fade-up">
              <div className="welcome-login">
                <div className="login-banner">
                  <img src="assets/img/Forgotpsw.png" className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>Welcome to <br />INSITIVE.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          {/* /Login Banner */}
          <div className="col-md-6 login-wrap-bg">
            {/* Login */}
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="img-logo">
                  <img src="assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <Link to="/dashboard">Back to Home</Link>
                  </div>
                </div>
                <h1>Forgot Password ?</h1>
                <div className="reset-password">
                  <p>Enter your email to reset your password.</p>
                </div>
                <form action="https://dreamslms.dreamstechnologies.com/html/login.html" onSubmit={this.handleSubmit}>
                  <div className="input-block">
                    <label className="form-control-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email address" name="email"
                      value={this.state.email}
                      onChange={this.updateValue} />
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-light-danger" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            {/* /Login */}
          </div>
        </div>
      </div>

    );
  }
}
export default WithHook(ForgotPassword);

