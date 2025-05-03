import { Component } from "react";
import { Link } from "react-router-dom";
import WithHook from "./hoc";
import axios from 'axios';
import { showError, showNetworkError, showMessage } from "./message";
import { ToastContainer } from "react-toastify";

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

    let apiAddress = "http://127.0.0.1:5000/users/change_password"; // update path if needed
    let form = new FormData();
    form.append("id", id);
    form.append("oldpassword", oldpassword);
    form.append("newpassword", newpassword);

    axios({
      method: 'post',
      responseType: 'json',
      url: apiAddress,
      data: form,
      headers: { 'Content-Type': 'application/json' } 
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
                <h1>want to change Password ?</h1>
                <form action="https://dreamslms.dreamstechnologies.com/html/login.html" onSubmit={this.handleSubmit}>
                  <div className="input-block">
                    <label className="form-control-label">old password</label>
                    <input type="passwprd" className="form-control" name="oldpassword" id="oldpassword" placeholder="Enter your old password" value={this.state.oldpassword}
                      onChange={this.updateValue} />
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">new password</label>
                    <input type="password" className="form-control" id="newpassword" placeholder="Enter your new password" name="newpassword"
                      value={this.state.newpassword}
                      onChange={this.updateValue} />
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">confirm password</label>
                    <input type="password" id="confirmpassword" className="form-control" placeholder="Enter your confirm pasword" name="confirmpassword"
                      value={this.state.confirmpassword}
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
export default WithHook(ChangePassword);
