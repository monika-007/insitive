import { Component } from "react";
import { Link } from "react-router-dom";
export default class footer extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        return (
            <>
            {/*begin::Footer*/}
            <div className="footer py-4 d-flex flex-lg-column " id="kt_footer">
                            {/*begin::Container*/}
                            <div className=" container-fluid  d-flex flex-column flex-md-row flex-stack">
                                {/*begin::Copyright*/}
                                <div className="text-dark order-2 order-md-1">
                                    <span className="text-muted fw-semibold me-2">2025&copy;</span>

                                    <a href="https://keenthemes.com/" target="_blank" rel="noreferrer" 
                                        className="text-gray-800 text-hover-primary">insitive.org</a>
                                </div>
                                {/*end::Copyright*/}

                                {/*begin::Menu*/}
                                <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                                    <li className="menu-item"><Link to="/about" target="_blank"
                                        className="menu-link px-2">About</Link></li>
                                </ul>
                                {/*end::Menu*/}
                            </div>
                            {/*end::Container*/}
                        </div>
                        {/*end::Footer*/}
            </>
   );
    }
}