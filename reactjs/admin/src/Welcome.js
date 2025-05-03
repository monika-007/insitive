import { Component } from "react";
import { Link } from "react-router-dom";
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="d-flex flex-column flex-root">
                {/*begin::Authentication - Signup Welcome Message */}
                <div className="d-flex flex-column flex-column-fluid">
                    {/*begin::Content*/}
                    <div className="d-flex flex-row-fluid flex-column flex-column-fluid text-center p-10 py-lg-20">
                        {/*begin::Logo*/}
                        <Link to="/" className="pt-lg-20 mb-12">
                            <img alt="Logo" src="assets/media/logos/insitive-light-fina_.svg" className="h-60px" /> {/*logo here*/}
                        </Link>
                        {/*end::Logo*/}


                        {/*begin::Logo*/}
                        <h1 className="fw-bold fs-2qx text-gray-800 mb-7">Welcome to insitive</h1>
                        {/*end::Logo*/}

                        {/*begin::Message*/}
                        <div className="fw-semibold fs-3 text-muted mb-15">
                            keep up with the insides <br />
                            with insitives.
                        </div>
                        {/*end::Message*/}

                        {/*begin::Action*/}
                        <div className="text-center">
                            <Link to="/" className="btn btn-lg btn-primary fw-bold">Go to Log in page</Link>
                        </div>
                        {/*end::Action*/}

                    </div>
                    {/*end::Content*/}

                    {/*begin::Illustration*/}
                    <div
                        className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-150px min-h-lg-350px"
                        style={{ backgroundImage: 'url(../../assets/media/illustrations/sigma-1/7.png)' }}>
                    </div>
                    {/*end::Illustration*/}
                </div>
                {/*end::Authentication - Signup Welcome Message*/}
            </div>
        )
    }
}