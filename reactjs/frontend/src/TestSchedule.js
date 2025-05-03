import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from 'axios';
export default class TestSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        };
    }
    componentDidMount() {
        this.fetchTest();
    }
    fetchTest = () => {
        axios.get("http://127.0.0.1:5000/test_schedule")
            .then(response => {
                this.setState({ tests: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            });
    }
    render() {
        return (
            <div className="main-wrapper">
                {/* Header */}
                <Header />
                {/* /Header */}
                {/* Latest Blog */}
                <section className="section latest-blog">
                    <div className="container mt-5 p-3 bg-light">
                        <div className="row text-left bg-danger-light text-white fw-bold p-2">
                            <div className="col">Subject</div>
                            <div className="col">Test-Name</div>
                            <div className="col">Marks</div>
                            <div className="col">Date</div>
                            <div className="col">Duration</div>
                        </div>
                        {this.state.tests.length > 0 ? (
                            this.state.tests.map((test, index) => (
                        <div key={index} className="row bg-light border p-3 mt-2">
                            <div className="col">{test.title}</div>
                            <div className="col">{test.test_name}</div>
                            <div className="col">{test.total_marks}</div>
                            <div className="col">{test.test_date}</div>
                            <div className="col">{test.duration}</div>
                        </div>
                          ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No test data available
                                </td>
                            </tr>
                        )}
                        
                        <div className="text-center mt-4">
                            <Link to="/mark" className="btn w-100"  style={{ backgroundColor: "#FFE1DE", color: "#000" }}>view marks</Link>
                        </div>
                    </div>
                </section>
                {/* /Latest Blog */}
                {/* Footer */}
                <Footer />
                {/* /Footer */}
            </div>

        );
    }
}

