import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from 'axios';
export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const apiAddress = "http://127.0.0.1:5000/users";
        axios.get(apiAddress)
            .then(response => {
                this.setState({ students: response.data, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ error: "Failed to fetch data. Please try again.", loading: false });
            });
    }

    render() {
        const { students, loading, error } = this.state;
        return (
            <>
                {/* Main Wrapper */}
                <div className="main-wrapper">
                    {/* Header */}
                    <Header/>
                    {/* /Header */}
                    {/* Course */}
                    <section className="section latest-blog">
                    <div className="container">
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    {students.map((student, index) => (
                                        <div className="col-lg-12 col-md-12 d-flex" key={index}>
                                            <div className="course-box course-design list-course d-flex">
                                                <div className="product">
                                                    <div className="product-content">
                                                        <div className="head-course-title">
                                                            <h3 className="title">{student.first_name} {student.last_name} </h3>
                                                            <div className="all-btn all-category d-flex align-items-center">
                                                                <Link to={`/mark/${student.id}`} className="btn btn-primary">
                                                                    View Marks
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="course-group d-flex mb-0">
                                                            <div className="course-group-img d-flex">
                                                                <div className="course-name">
                                                                    <h4>{student.course}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                    {/* /Course */}
                    {/* Footer */}
                    <Footer/>
                    {/* /Footer */}
                </div>
                {/* /Main Wrapper */}
            </>
        );
    }
}
