import { Component } from "react";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import WithHook from "./hoc";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
          <header className="header">
          <div className="header-fixed">
            <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
              <div className="container">
                <div className="navbar-header">
                  <RouterLink id="mobile_btn" to="javascript:void(0);">
                    <span className="bar-icon">
                      <span />
                      <span />
                      <span />
                    </span>
                  </RouterLink>
                  <div href className="navbar-brand logo">
                    <img src="/assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                  </div>
                </div>
                <div className="main-menu-wrapper">
                  <div className="menu-header">
                    <RouterLink to="/dashboard" className="menu-logo">
                      <img src="/assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                    </RouterLink>
                    <RouterLink id="menu_close" className="menu-close" to="javascript:void(0);">
                      <i className="fas fa-times" />
                    </RouterLink>
                  </div>
                  <ul className="main-nav">
                    <li className="has-submenu ">
                      <RouterLink className to="/dashboard">Home </RouterLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/students">Students </RouterLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/events">Events </RouterLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/courses">Cources</RouterLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/assignment">Assignments</RouterLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/test">Test Schedule</RouterLink>
                    </li>
                    <li className="has-submenu">
                      <ScrollLink to="footer">Contact us </ScrollLink>
                    </li>
                    <li className="has-submenu">
                      <RouterLink to="/aboutus">About us </RouterLink>
                    </li>
                    <li className="login-link">
                      <RouterLink to={`/profile/${this.props.params.id}`}>profile</RouterLink>
                    </li>
                  </ul>
                </div>
                <ul className="nav header-navbar-rht">
                  <li className="nav-item user-nav">
                    <RouterLink to="/profile">
                      <span className="user-img">
                        <img src="/assets/img/onlyprofile.jpg" alt="Img" />
                        <span className="status online" />
                      </span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        
        );
    }
}
export default WithHook(Header);