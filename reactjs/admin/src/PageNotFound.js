import React, { Component } from "react";
export default class PageNotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                {/*begin::Main*/}
                <div className="d-flex flex-column flex-root">
                    {/*begin::Authentication - 404 Page*/}
                    <div className="d-flex flex-column flex-center flex-column-fluid p-10">
                        {/*begin::Illustration*/}
                        <img src="../../assets/media/illustrations/sigma-1/18.png" alt="" className="mw-100 mb-10 h-lg-450px" />
                        {/*end::Illustration*/}

                        {/*begin::Message*/}
                        <h1 className="fw-semibold mb-10" style={{ color: '#A3A3C7' }}>Seems there is nothing here</h1>
                        {/*end::Message*/}

                        {/*begin::Link*/}
                        <a href="../../index-2.html" className="btn btn-primary">Return Home</a>
                        {/*end::Link*/}
                    </div>
                    {/*end::Authentication - 404 Page*/}

                </div>
                {/*end::Main*/}

            </>
        );
    }
}