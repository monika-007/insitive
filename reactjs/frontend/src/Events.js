import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }
    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = () => {
        axios.get("http://127.0.0.1:5000/events")
            .then(response => {
                this.setState({ events: response.data });
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
                    <div className="container mt-5">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <h3 className="text-center"><b>Events</b></h3>
                                {this.state.events.length > 0 ? (
                                    this.state.events.map((event, index) => (
                                        <div key={index} className="p-3 bg-light border rounded mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">{event.name}</h5>
                                                <span className="text-muted">{event.date}</span>
                                            </div>
                                            <p className="mt-3">
                                                <strong>Description:</strong> {event.description}
                                            </p>
                                        </div>

                                    ))
                                ) : (
                                    <div className="text-center text-muted py-3">
                                        No events available
                                    </div>
                                )}

                            </div>
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

