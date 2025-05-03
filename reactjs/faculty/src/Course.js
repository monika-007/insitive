import { Component } from "react";
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        };
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = () => {
        axios
            .get("http://127.0.0.1:5000/courses/feedback") // Change URL to match your API route
            .then((response) => {
                this.setState({ courses: response.data });
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                alert("Failed to fetch courses.");
            });
    };

    render() {
        const { courses } = this.state;

        return (
            <div className="main-wrapper">
                {/* Header */}
                <Header />
                {/* /Header */}
                {/* Course */}
                <section className="section latest-blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="container mt-4">
                                                    {courses.length > 0 ? (
                                                        courses.map((course, index) => (
                                                            <div key={index} className="product-content mb-4 p-3 border rounded">
                                                                <div className="head-course-title">
                                                                    <h3 className="title">
                                                                        <Link to={`/course_details/${course.id}`}>
                                                                            {course.name}
                                                                        </Link>
                                                                    </h3>
                                                                    <div className="all-btn all-category d-flex align-items-center">
                                                                        <Link to={`/course_details/${course.id}`} className="btn btn-primary">
                                                                            Learn More
                                                                        </Link>
                                                                    </div>
                                                                </div>

                                                                <div className="rating">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <i
                                                                            key={i}
                                                                            className={
                                                                                i < Math.floor(course.rating)
                                                                                    ? "fas fa-star filled"
                                                                                    : "fas fa-star"
                                                                            }
                                                                        />
                                                                    ))}
                                                                    <span className="d-inline-block average-rating">
                                                                        <span>{course.rating}</span> ({course.reviews})
                                                                    </span>
                                                                </div>

                                                                <div className="course-group d-flex mb-0">
                                                                    <div className="course-group-img d-flex">
                                                                        <div className="course-name">
                                                                            <h4>{course.first_name +" "+ course.last_name}</h4>
                                                                            <p>Instructor</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No courses available</p>
                                                    )}
                                                </div>
                                             
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 d-flex">
                                        <div className="course-box course-design list-course d-flex">
                                            <div className="product">
                                                <div className="product-content">
                                                    <div className="head-course-title">
                                                        <h3 className="title"><a href="user_course_detail.html">Information About UI/UX
                                                            Design Degree</a></h3>
                                                        <div className="all-btn all-category d-flex align-items-center">
                                                            <a href="user_course_detail.html" className="btn btn-primary">learn more</a>
                                                        </div>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                                                    </div>
                                                    <div className="course-group d-flex mb-0">
                                                        <div className="course-group-img d-flex">
                                                            <div className="course-name">
                                                                <h4><a href="instructor-profile.html">Rolands R</a></h4>
                                                                <p>Instructor</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Course */}
                {/* Footer */}
                <Footer />
                {/* /Footer */}
            </div>

        );
    }
}

