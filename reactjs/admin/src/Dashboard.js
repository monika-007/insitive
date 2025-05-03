import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Asidemenu from "./Asidemenu";
import { Link } from "react-router-dom";
import axios from "axios";
export default class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: [],
            test: [],
            events: []
        };

    }
    componentDidMount() {
        const feedbackApi = axios.get("http://127.0.0.1:5000/feedback");
        const testApi = axios.get("http://127.0.0.1:5000/test_schedule");
        const eventApi = axios.get("http://127.0.0.1:5000/events");
        Promise.all([feedbackApi, testApi, eventApi])
            .then(([feedbackRes, testRes, eventRes]) => {
                this.setState({
                    feedback: feedbackRes.data,
                    test: testRes.data,
                    events: eventRes.data
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }

    renderStars(rating) {
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return filledStars + emptyStars;
    }

    render() {
        return (
            <>
                {/*begin::Root*/}
                <div className="d-flex flex-column flex-root">
                    {/*begin::Page*/}
                    <div className="page d-flex flex-row flex-column-fluid">
                        <Asidemenu />
                        {/*begin::Wrapper*/}
                        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                            <Header />

                            {/*begin::Content*/}
                            <div className="content fs-6 d-flex flex-column flex-column-fluid" id="kt_content">
                                {/*begin::Toolbar*/}
                                <div className="toolbar" id="kt_toolbar">
                                    <div className=" container-fluid  d-flex flex-stack flex-wrap flex-sm-nowrap">

                                    </div>
                                </div>
                                {/*end::Toolbar*/}

                                {/*begin::Post*/}
                                <div className="post fs-6 d-flex flex-column-fluid" id="kt_post">
                                    {/*begin::Container*/}
                                    <div className=" container-xxl ">
                                        {/*begin::Row*/}
                                        <div className="row g-xl-8">
                                            {/*begin::Col*/}
                                            <div className="col-xxl-8">
                                                {/*begin::Row*/}
                                                <div className="row g-xl-8">
                                                    {/*begin::Col*/}
                                                    <div className="col-xl-6">
                                                        {/*begin::Chart Widget 1*/}
                                                        <div className="card  card-xl-stretch mb-5 mb-xl-8">
                                                            {/*begin::Body*/}
                                                            <div className="card-body p-0 d-flex justify-content-between flex-column">
                                                                <div className="d-flex flex-stack card-p flex-grow-1">
                                                                    {/*begin::Icon*/}

                                                                    {/*end::Icon*/}

                                                                    {/*begin::Text*/}
                                                                    <Link to="/student" className="d-flex flex-column text-end">
                                                                        <span className="fw-bolder text-gray-800 fs-2">User over veiw</span>
                                                                        {/* <span className="text-gray-400 fw-semibold fs-6">overveiw</span> */}
                                                                        <button
                                                                            className="btn btn-light-primary btn-sm mt-3"
                                                                            style={{
                                                                                padding: '6px 6px',
                                                                                fontSize: '12px',
                                                                                lineHeight: '1'
                                                                            }}
                                                                        >
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                    {/*end::Text*/}
                                                                </div>

                                                                {/*begin::Chart*/}
                                                                {/* user over view details charli xex*/}
                                                                {/*end::Chart*/}
                                                            </div>
                                                        </div>
                                                        {/*end::Chart Widget 1*/}
                                                    </div>
                                                    {/*end::Col*/}

                                                    {/*begin::Col*/}
                                                    <div className="col-xl-6">
                                                        {/*begin::Slider Widget 1*/}
                                                        <div className="card card-xl-stretch mb-5 mb-xl-8">
                                                            {/*begin::Body*/}
                                                            <div className="card-body pt-5">
                                                                <div id="kt_stats_widget_8_carousel"
                                                                    className="carousel carousel-custom carousel-stretch slide"
                                                                    data-bs-ride="carousel" data-bs-interval="8000">
                                                                    {/*begin::Heading*/}
                                                                    <Link to="/feedback" className="d-flex flex-stack flex-wrap">
                                                                        <span className="fs-4 text-gray-400 fw-bolder pe-2">Latest
                                                                            FeedBack</span>

                                                                        {/*begin::Carousel Indicators*/}
                                                                        <ol
                                                                            className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                                                            <li data-bs-target="#kt_stats_widget_8_carousel"
                                                                                data-bs-slide-to="0" className="ms-1 active"></li>
                                                                            <li data-bs-target="#kt_stats_widget_8_carousel"
                                                                                data-bs-slide-to="1" className="ms-1"></li>
                                                                            <li data-bs-target="#kt_stats_widget_8_carousel"
                                                                                data-bs-slide-to="2" className="ms-1"></li>
                                                                            <li data-bs-target="#kt_stats_widget_8_carousel"
                                                                                data-bs-slide-to="3" className="ms-1"></li>
                                                                        </ol>
                                                                        {/*end::Carousel Indicators*/}
                                                                    </Link>
                                                                    {/*end::Heading*/}

                                                                    {/*begin::Carousel*/}
                                                                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                                                        <div className="carousel-inner pt-6">
                                                                            {this.state.feedback.length > 0 ? (
                                                                                this.state.feedback.map((item, index) => (
                                                                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                                                        <div className="carousel-wrapper">
                                                                                            <div className="d-flex flex-column justify-content-between flex-grow-1">
                                                                                                <Link to="/feedback" className="fs-2 text-gray-800 text-hover-primary fw-bolder">{item.first_name + " " + item.last_name}</Link>
                                                                                                <p className="text-gray-600 fs-6 fw-semibold pt-4 mb-0">{item.review}</p>
                                                                                                <div className="rating" style={{
                                                                                                    color:" gold"
                                                                                                }}>
                                                                                                    {this.renderStars(item.rating)}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <div className="carousel-item active">
                                                                                    <div className="d-block w-100 p-3 border bg-light text-center">No feedback available</div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                            <span className="visually-hidden">Previous</span>
                                                                        </button>
                                                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                            <span className="visually-hidden">Next</span>
                                                                        </button>
                                                                    </div>
                                                                    {/*end::Carousel*/}
                                                                </div>
                                                            </div>
                                                            {/*end::Body*/}
                                                        </div>
                                                        {/*end::Slider Widget 1*/}
                                                    </div>
                                                    {/*end::Col*/}
                                                </div>
                                                {/*end::Row*/}

                                                {/*begin::Row*/}
                                                <div className="row g-xl-8">
                                                    {/*begin::Col*/}
                                                    <div className="col-xl-6">
                                                        {/*begin::Slider widget 2*/}
                                                        <div className="card  card-xl-stretch mb-5 mb-xl-8">
                                                            {/*begin::Body*/}
                                                            <div className="card-body pt-5">
                                                                {/*begin::Carousel*/}
                                                                <div id="kt_stats_widget_9_carousel" className="carousel carousel-custom carousel-stretch slide" data-bs-ride="carousel" data-bs-interval="8000">
                                                                    <Link to="/events" className="d-flex flex-stack flex-wrap">
                                                                        <span className="text-gray-400 fw-bolder fs-4 pe-2">Upcomping Events</span>
                                                                        <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                                                            {this.state.events.map((_, index) => (
                                                                                <li key={index} data-bs-target="#kt_stats_widget_9_carousel" data-bs-slide-to={index} className={index === 0 ? "ml-1 active" : "ml-1"}></li>
                                                                            ))}
                                                                        </ol>
                                                                    </Link>
                                                                    <div className="carousel-inner pt-8">
                                                                        {this.state.events.map((item, index) => (
                                                                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                                                <div className="carousel-wrapper">
                                                                                    <div className="flex-grow-1">
                                                                                        <Link to="/events" className="fs-2 text-gray-800 text-hover-primary fw-bolder">{item.name}</Link>
                                                                                        <p className="text-primary fs-1 fw-bolder pt-5 mb-0">{item.date}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <button className="carousel-control-prev" type="button" data-bs-target="#kt_stats_widget_9_carousel" data-bs-slide="prev">
                                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span className="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button className="carousel-control-next" type="button" data-bs-target="#kt_stats_widget_9_carousel" data-bs-slide="next">
                                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span className="visually-hidden">Next</span>
                                                                    </button>
                                                                </div>
                                                                {/*end::Carousel*/}
                                                            </div>
                                                            {/*end::Body*/}
                                                        </div>
                                                        {/*end::Slider widget 2*/}
                                                    </div>
                                                    {/*end::Col*/}

                                                    {/*begin::Col*/}
                                                    <div className="col-xl-6">
                                                        {/*begin::Slider widget 2*/}
                                                        <div className="card  card-xl-stretch mb-5 mb-xl-8">
                                                            {/*begin::Body*/}
                                                            <div className="card-body pt-5">
                                                                {/*begin::Carousel*/}
                                                                <div id="kt_stats_widget_7_carousel" className="carousel carousel-custom carousel-stretch slide" data-bs-ride="carousel" data-bs-interval="8000">
                                                                    <Link to="/test" className="d-flex flex-stack flex-wrap">
                                                                        <span className="text-gray-400 fw-bolder fs-4 pe-2">TEST</span>
                                                                        <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                                                            {this.state.test.map((_, index) => (
                                                                                <li key={index} data-bs-target="#kt_stats_widget_7_carousel" data-bs-slide-to={index} className={index === 0 ? "ml-1 active" : "ml-1"}></li>
                                                                            ))}
                                                                        </ol>
                                                                    </Link>
                                                                    <div className="carousel-inner pt-8">
                                                                        {this.state.test.map((item, index) => (
                                                                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                                                <div className="carousel-wrapper">
                                                                                    <div className="flex-grow-1">
                                                                                        <Link to="/test" className="fs-2 text-gray-800 text-hover-primary fw-bolder">{item.test_name}</Link>
                                                                                        <p className="text-primary fs-1 fw-bolder pt-5 mb-0">{item.test_date}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <button className="carousel-control-prev" type="button" data-bs-target="#kt_stats_widget_7_carousel" data-bs-slide="prev">
                                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span className="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button className="carousel-control-next" type="button" data-bs-target="#kt_stats_widget_7_carousel" data-bs-slide="next">
                                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span className="visually-hidden">Next</span>
                                                                    </button>
                                                                </div>
                                                                {/*end::Carousel*/}
                                                            </div>
                                                            {/*end::Body*/}
                                                        </div>
                                                        {/*end::Slider widget 2*/}
                                                    </div>
                                                    {/*end::Col*/}
                                                </div>
                                                {/*end::Row*/}
                                            </div>
                                            {/*end::Col*/}

                                            {/*begin::Col*/}
                                            <div className="col-xxl-4 gy-0 gy-xxl-8">
                                                {/*begin::Engage Widget 1*/}
                                                <div className="card card-xxl-stretch mb-5 mb-xl-8">
                                                    {/*begin::Body*/}
                                                    <div className="card-body pb-0">
                                                        {/*begin::Wrapper*/}
                                                        {/* insert any add */}
                                                        {/*end::Wrapper*/}
                                                    </div>
                                                    {/*end::Body*/}
                                                </div>
                                                {/*end::Engage Widget 1*/}
                                            </div>
                                            {/*end::Col*/}
                                        </div>
                                        {/*end::Row*/}

                                    </div>
                                    {/*end::Container*/}
                                </div>
                                {/*end::Post*/}
                            </div>
                            {/*end::Content*/}
                            <Footer />
                        </div>
                        {/*end::Wrapper*/}
                    </div>
                    {/*end::Page*/}
                </div >
                {/*end::Root*/}
            </>
        );
    }
}
