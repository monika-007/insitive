import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class EditAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            subject_id: "",
            due_date: "",
            total_marks: "",
            subjects: [],
            loading: true
        };
    }

    componentDidMount() {
        const id  = this.props.params.id;
        console.log("🛠 Fetching assignment details for ID:", id);

        if (!id) {
            alert("❌ No assignment ID found!");
            return;
        }

         // Fetch existing assignment data
         axios.get(`http://127.0.0.1:5000/assignment/${id}`)
         .then(response => {
             console.log("Fetched assignment details:", response.data);
             if (response.data.length > 0) {
                 this.setState({
                     name: response.data[0].name,
                     description: response.data[0].description,
                     subject_id: response.data[0].subject_id,
                     due_date: response.data[0].due_date, // Handle missing values
                     total_marks: response.data[0].total_marks, // Handle missing values
                     loading: false
                 });
             }
         })
         .catch(error => console.error("Error fetching assignment:", error));
         
         axios
         .get("http://127.0.0.1:5000/assignment/subjects")
         .then((response) => {
             console.log("Fetched subjects:", response.data); // Debugging log

             // Map API response to correct format
             const subjects = response.data.map((subject) => ({
                 id: subject.subject_id,
                 title: subject.title
             }));

             this.setState({ subjects });
         })
         .catch((error) => console.error("Error fetching subjects", error));
 };
       
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id  = this.props.params.id;
        const apiAddress = "http://127.0.0.1:5000/assignment";
        let form = new FormData();
        form.append("name", this.state.name)
        form.append("description", this.state.description);
        form.append("due_date", this.state.due_date);
        form.append("total_marks", this.state.total_marks);
        form.append("subject_id", this.state.subject_id);
        form.append("id",id);

        axios({
            method: 'put',  // Change to PUT method
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
        })
        .then((response) => {
            console.log("assignment updated:", response.data);
        
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
                   alert("assignments updated successfully!");                    
                   this.setState({ name: "" , description: "", due_date: "" ,total_marks:"", subject_id: ""});
                   setTimeout(() => {
                        this.props.navigate("/assignment");
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
                                                    <h1 className="m-9">Edit Assignment list</h1>
                                                    <Link to="/assignment" className="btn btn-light m-9">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                <form  onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Edit Name</label>
                                                            <input type="text" className="form-control" id="name"
                                                                placeholder="Enter Test name" name="name" value={this.state.name} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="subject_id" className="form-label">Edit Subject</label>
                                                            <select
                                                                id="subject_id"
                                                                className="form-select"
                                                                name="subject_id"
                                                                value={this.state.subject_id}
                                                                onChange={(e) =>this.handleChange(e)}
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
                                                            <label htmlFor="Description" className="form-label">Edit Description</label>
                                                            <input type="text" className="form-control" id="Description"
                                                                placeholder="Enter test Description"  name="description" value={this.state.description} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="Due Date" className="form-label">Edit Due Date</label>
                                                            <input type="date" className="form-control" id="Due Date"
                                                                placeholder="EnterDue Date" name="due_date" value={this.state.due_date} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="total_marks" className="form-label">Edit Total Marks</label>
                                                            <input type="number" className="form-control" id="total_marks"
                                                                placeholder="Enter Total Marks" name="total_marks" value={this.state.total_marks} onChange={this.handleChange} required />
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
export default WithHook(EditAssignment);