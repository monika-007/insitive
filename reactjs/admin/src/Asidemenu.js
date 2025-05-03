import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Asidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSettingsOpen: false,
        };
    }

    toggleSettings = () => {
        this.setState((prevState) => ({
            isSettingsOpen: !prevState.isSettingsOpen
        }));
    }

    render() {
        return (
            <>
                {/*begin::Aside*/}
                <div id="kt_aside" className="aside aside-default  aside-hoverable " data-kt-drawer="true"
                    data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}"
                    data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}"
                    data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">

                    {/*begin::Brand*/}
                    <div className="aside-logo flex-column-auto px-10 pt-9 pb-5" id="kt_aside_logo">
                        {/*begin::Logo*/}
                        {/*img alt="Logo" src="assets/media/logos/insitive-light-fina_.svg" className="img-fluid" style={{maxHeight: '60px'}} /*/}
                        <Link to="/dashboard">
                            <img alt="Logo" src="/assets/media/logos/insitive-light-fina_.svg"
                                style={{ maxHeight: '60px' }} className="logo-default theme-light-show" />

                        </Link>
                        {/*end::Logo*/}
                    </div>
                    {/*end::Brand*/}

                    {/*begin::Aside menu*/}
                    <div className="aside-menu flex-column-fluid ps-3 pe-1">
                        {/*begin::Aside Menu*/}

                        {/*begin::Menu*/}
                        <div className="menu menu-sub-indention menu-column menu-rounded menu-title-gray-600 menu-icon-gray-400 menu-active-bg menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 my-5 mt-lg-2 mb-lg-0"
                            id="kt_aside_menu" data-kt-menu="true">

                            <div className="hover-scroll-y mx-4" id="kt_aside_menu_wrapper" data-kt-scroll="true"
                                data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto"
                                data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset="20px"
                                data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
                                style={{
                                    overflowY: 'auto',
                                    maxHeight: 'calc(100vh - 100px)'
                                }}>
                           

                                {/*begin:Menu item*/}
                                <div data-kt-menu-trigger="click" className="menu-item here show menu-accordion">
                                    {/*begin:Menu link*/}

                                    <span className="menu-arrow"></span>

                                    {/*end:Menu link*/}
                                    {/*begin:Menu sub*/}
                                    <div className="menu-sub menu-sub-accordion">
                                        {/*begin:Menu item*/}
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link to="/dashboard" className="menu-link active" >
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Dashboard</span>
                                            </Link>
                                            {/*end:Menu link*/}
                                        </div>
                                        {/*end:Menu item*/}

                                        {/*begin:Menu item*/}
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link " to="/feedback">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Feedback</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/student">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Students</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div> <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/course">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Course</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/faculties">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Faculties</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/test">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Test Schedule</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/assignment">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Assignment</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/events">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Events</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        <div className="menu-item">
                                            {/*begin:Menu link*/}
                                            <Link className="menu-link" to="/mark">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Marks</span>
                                            </Link>
                                            {/*end:Menu link*/}

                                        </div>
                                        {/*begin:Menu item*/}
                                        <div className={`menu-item menu-accordion ${this.state.isSettingsOpen ? 'show' : ''}`}>
                                            <div className="menu-link" onClick={this.toggleSettings}>
                                                <span className="menu-title">Settings</span>
                                                <span className="menu-arrow"></span>
                                            </div>


                                            {/*begin:Menu sub*/}
                                            <div className="menu-sub menu-sub-accordion">
                                                <div className="menu-item">
                                                    <Link className="menu-link" to="/change_password">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Change password</span>
                                                    </Link>
                                                </div>
                                                <div className="menu-item">
                                                    <Link className="menu-link" to="/forgot_password">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Forgot password</span>
                                                    </Link>
                                                </div>
                                                <div className="menu-item">
                                                    <Link className="menu-link" to="/signout">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Sign-out</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            {/*end:Menu sub*/}
                                        </div>
                                        {/*end:Menu item*/}
                                    </div>
                                    {/*end:Menu sub*/}
                                </div>

                                {/*end:Menu item*/}
                                {/*begin:Menu item*/}
                                <div className="menu-item">
                                    {/*begin:Menu content*/}
                                    <div className="menu-content">
                                        <div className="separator mx-1 my-4"></div>
                                    </div>
                                    {/*end:Menu content*/}
                                </div>


                                {/*end:Menu item*/}
                            </div>
                        </div>
                        {/*end::Menu*/}
                    </div>
                    {/*end::Aside menu*/}


                </div>
                {/*end::Aside*/}
            </>
        );
    }
}