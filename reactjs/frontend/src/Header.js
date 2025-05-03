import { Component } from "react";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
export default class Header extends Component {
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
                <RouterLink className="navbar-brand logo">
                  <img src="/assets/img/insitive-light-fina_.svg" className="img-fluid" alt="Logo" />
                </RouterLink>
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
                    <RouterLink to="/events">event </RouterLink>
                  </li>
                  <li className="has-submenu">
                    <RouterLink to="/courses">courses</RouterLink>
                  </li>

                  <li className="has-submenu">
                    <ScrollLink to="footer" smooth={true} duration={500}>contact us </ScrollLink>
                  </li>

                  <li className="has-submenu">
                    <RouterLink to="/aboutus">about us </RouterLink>
                  </li>
                  <li className="login-link">
                        <RouterLink to="/profile">profile</RouterLink>
                      </li>
                </ul>
              </div>
              <ul className="nav header-navbar-rht">
                <li className="nav-item user-nav">
                  <RouterLink to="/profile">
                    <span className="user-img">
                      <img
                        src="/assets/img/onlyprofile.jpg"
                        alt="Img"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }} // adjust size here
                      />
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

