import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.params.id;
        console.log("🛠 Fetching events details for ID:", id);

        if (!id) {
            alert("❌ No event ID found!");
            return;
        }

        // Fetch existing event data
        axios.get(`http://127.0.0.1:5000/events/${id}`)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    date: response.data.date,
                    loading: false // Ensure loading state is updated
                });
            })
            .catch(error => {
                console.error("Error fetching event:", error);
                this.setState({ loading: false }); // Even on error, stop loading
            });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id = this.props.params.id;
        const apiAddress = "http://127.0.0.1:5000/events";
        let form = new FormData();
        form.append("name", this.state.name)
        form.append("description", this.state.description);
        form.append("date", this.state.date);
        form.append("id", id);

        axios({
            method: 'put',  // Change to PUT method
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
        }).then((response) => {
                console.log("event updated:", response.data);
                let error = response.data[0].error; // Check if error exists
                if (error !== 'no') {
                    console.log(error);
                    //alert(error);
                } else {
                    let success = response.data[1].success;
                    let message = response.data[2].message;
                    if (success === 'no') {
                        console.log(message);
                        alert(message);
                    } 
                    else
                     {
                        alert("event updated successfully!");
                        this.setState({ name: "", description: "", date: "" });
                        setTimeout(() => {
                            this.props.navigate("/events");
                        }, 500);
                    }
                }
            }).catch((error) => alert("Network error: " + error));
    };
    render() {
        if (this.state.loading) return <p>Loading...</p>;
        return (
            <>
                <div className="d-flex flex-column flex-root">
                    {/*begin::Page*/}
                    <div className="page d-flex flex-row flex-column-fluid">
                        {/*begin::Aside*/}
                        <Asidemenu />
                        {/*end::Aside*/}

                        {/*begin::Wrapper*/}
                        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                            {/*begin::Header*/}
                            <Header />
                            {/*end::Header*/}

                            {/*begin::Content*/}
                            <div className="content fs-6 d-flex flex-column flex-column-fluid" id="kt_content">
                                <div className="container mt-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10">
                                            <div className="card shadow-lg">
                                                <div className="card-header bg-primary text-white text-center">
                                                    <h1 className="m-7">Edit Event </h1>
                                                    <Link to="/events" className="btn btn-light m-7">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Edit Event Name</label>
                                                            <input type="text" className="form-control" id="name" placeholder="Enter Event name" name="name" value={this.state.name} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="description" className="form-label">Edit description</label>
                                                            <input type="text" className="form-control" id="description" placeholder="Enter event description" name="description" value={this.state.description} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="date" className="form-label">Edit Date</label>
                                                            <input type="date" className="form-control" id="date" placeholder="Enter date" name="date" value={this.state.date} onChange={this.handleChange} required />

                                                        </div>
                                                        <button type="submit" className="btn btn-primary w-100">Edit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*end::Content*/}

                            {/*begin::Footer*/}
                            <Footer />
                            {/*end::Footer*/}
                        </div>
                        {/*end::Wrapper*/}
                    </div>
                    {/*end::Page*/}
                </div>
            </>
        );
    }
}
export default WithHook(EditEvent);