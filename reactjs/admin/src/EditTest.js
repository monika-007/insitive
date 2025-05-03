import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class EditTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test_name: "",
            subject_id: "",
            test_date: "",
            duration: "",
            total_marks:0,
            subjects: [],
            loading: true
        };
    }

    componentDidMount() {
        const id  = this.props.params.id;
        console.log("🛠 Fetching test details for ID:", id);

        if (!id) {
            alert("❌ No mark ID found!");
            return;
        }

         // Fetch existing marks data
         axios.get(`http://127.0.0.1:5000/test_schedule/${id}`)
         .then(response => {
             console.log("Fetched test details:", response.data);
             if (response.data.length > 0) {
                 this.setState({
                    test_name: response.data[0].test_name,
                    subject_id: response.data[0].subject_id,
                    test_date: response.data[0].test_date,
                    duration: response.data[0].duration, 
                    total_marks: Number(response.data[0].total_marks) || 0, 
                     loading: false
                 });
             }
         })
         .catch(error => console.error("Error fetching marks:", error));
     
        axios.get("http://127.0.0.1:5000/test_schedule/subjects")
        .then(response => {
            console.log("Fetched students:", response.data); // Debugging log

            // Map API response to correct format
            const subjects = response.data.map((subject) => ({
                id: subject.subject_id,
                title: subject.title
            }));

            this.setState({ subjects });
        })
        .catch((error) => console.error("Error fetching teachers:", error));
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id  = this.props.params.id;
        const apiAddress = `http://127.0.0.1:5000/test_schedule`;
        let form = new FormData();
        form.append("test_name", this.state.test_name);
        form.append("subject_id", this.state.subject_id);
        form.append("test_date", this.state.test_date);
        form.append("duration", this.state.duration);
        form.append("total_marks", this.state.total_marks);
        form.append("id",id);

        axios({
            method: 'put',  // Change to PUT method
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
        })
        .then((response) => {
            console.log("test updated:", response.data);
        
            let error = response.data[0]?.error; // Check if error exists
            if (error !== 'no') {
                console.log(error);
                alert(error);
            } else {
                let success = response.data[1]?.success;
                let message = response.data[2]?.message;
        
                if (success === 'no') {
                    console.log(message);
                    alert(message);
                } else {
                   alert("test updated successfully!");                    
                   this.setState({ test_name: "", duration: "", test_date: "", total_marks: "", subject_id: "" });
                   setTimeout(() => {
                        this.props.navigate("/test");
                    }, 500);
                }
            }
        })
        .catch(error => alert("Network error: " + error));
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
                                                    <h1 className="m-9">Edit Test </h1>
                                                    <Link to="/test" className="btn btn-light m-9">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                <form onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="test_name" className="form-label">Edit Test Name</label>
                                                            <input type="text" className="form-control" id="test_name" placeholder="Enter test name" name="test_name" value={this.state.test_name} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="subject_id" className="form-label">Edit Subject Name</label>
                                                            <select
                                                                id="subject_id"
                                                                className="form-select"
                                                                name="subject_id"
                                                                value={this.state.subject_id}
                                                                onChange={(e) => this.handleChange(e)}
                                                            >
                                                                <option value="">Select subject</option>
                                                                {this.state.subjects.map((subject_id) => (
                                                                    <option key={subject_id.id} value={subject_id.id}>
                                                                        {subject_id.title}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="test_date" className="form-label"> Edit Date</label>
                                                            <input type="date" className="form-control" id="test_date" placeholder="Enter date" name="test_date" value={this.state.test_date} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="duration" className="form-label">Edit Duration</label>
                                                            <input type="integer" className="form-control" id="duration" placeholder="Enter duration" name="duration" value={this.state.duration} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="marks" className="form-label">Edit Total Marks</label>
                                                            <input type="number" className="form-control" id="marks" placeholder="Enter total marks" name="total_marks" value={this.state.total_marks} onChange={this.handleChange} required />
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
export default WithHook(EditTest);