import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",            
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const apiAddress = "http://127.0.0.1:5000/events";
        let form = new FormData();
        form.append("name", this.state.name)
        form.append("description", this.state.description);
        form.append("date", this.state.date);
        axios({
            method: 'post',
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } //new line added
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            if (error !== 'no')
                alert(error);
            else {
                let success = response.data[1]['success'];
                let message = response.data[2]['message'];
                if (success === 'no')
                    alert(message);
                else {

                    this.setState({ name: "", description: "", date: ""});

                    setTimeout(() => {
                        this.props.navigate("/events");
                    }, 1000);
                }
            }
        }).catch(error => alert("Network error: " + error));
    };
    render() {
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
                                                    <h1 className="m-7">Add Event </h1>
                                                    <Link to="/events" className="btn btn-light m-7">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Add Event Name</label>
                                                            <input type="text" className="form-control" id="name" placeholder="Enter Event name" name="name" value={this.state.name} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="description" className="form-label">Add description</label>
                                                            <input type="text" className="form-control" id="description" placeholder="Enter event description" name="description" value={this.state.description} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="date" className="form-label">Add Date</label>
                                                            <input type="date" className="form-control" id="date" placeholder="Enter date" name="date" value={this.state.date} onChange={this.handleChange} required />

                                                        </div>
                                                        <button type="submit" className="btn btn-primary w-100">Add</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*end::Content*/}

                            {/*begin::Footer*/}
                            <Footer/>
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
export default WithHook(AddEvent);