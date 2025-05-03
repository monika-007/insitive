import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import WithHook from "./hoc";
import { showError, showMessage } from "./message";
class EditMarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: "",
            test_id: "",
            marks_obtained: "",
            graded_at: "",
            students: [],
            tests: [],
            loading: true
        };
    }

    componentDidMount() {
        const id  = this.props.params.id;
        console.log("🛠 Fetching mark details for ID:", id);

        if (!id) {
            alert("❌ No mark ID found!");
            return;
        }

         // Fetch existing marks data
         axios.get(`http://127.0.0.1:5000/marks/${id}`)
         .then(response => {
             console.log("Fetched mark details:", response.data);
             if (response.data.length > 0) {
                 this.setState({
                     student_id: response.data[0].student_id,
                     test_id: response.data[0].test_id,
                     marks_obtained: response.data[0].marks_obtained,
                     graded_at: response.data[0].graded_at, // Handle missing values
                     loading: false
                 });
             }
         })
         .catch(error => console.error("Error fetching marks:", error));
     
        axios.get("http://127.0.0.1:5000/marks/students")
        .then(response => {
            console.log("Fetched students:", response.data); // Debugging log

            // Map API response to correct format
            const students = response.data.map((student) => ({
                 id: student.student_id,
                name: `${student.first_name} ${student.last_name}`
            }));
            console.log(students);
            this.setState({ students });
        })
        .catch((error) => console.error("Error fetching students:", error));

    // Fetch tests
    axios.get("http://127.0.0.1:5000/marks/test_name")
        .then(response => {
            console.log("Fetched test name:", response.data); // Debugging log

            // Map API response to correct format
            const tests = response.data.map((test) => ({
                id: test.test_id,
                name: test.test_name
            }));

            this.setState({ tests });
            this.forceUpdate()
        })
    .catch((error) => console.error("Error fetching tests:", error));
        
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id  = this.props.params.id;
        const apiAddress = `http://127.0.0.1:5000/marks`;
        let form = new FormData();
        form.append("student_id", this.state.student_id);
        form.append("test_id", this.state.test_id);
        form.append("marks_obtained", this.state.marks_obtained);
        form.append("graded_at", this.state.graded_at);
        form.append("id",id);

        axios({
            method: 'put',  // Change to PUT method
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
        })
        .then((response) => {
            console.log("Marks updated:", response.data);
        
            let error = response.data[0]?.error; // Check if error exists
            if (error !== 'no') {
                console.log(error);
                showError(error);
            } else {
                let success = response.data[1]?.success;
                let message = response.data[2]?.message;
        
                if (success === 'no') {
                    console.log(message);
                    showMessage(message);
                } else {
                    this.setState({ student_id: "", test_id: "", marks_obtained: "", graded_at: "" });
                    showMessage("Marks updated successfully!");                    
                    setTimeout(() => {
                        this.props.navigate("/mark");
                    }, 1000);
                }
            }
        })
        .catch(error => showError("Network error: " + error));
    };   
    render() {
        if (this.state.loading) return <p>Loading...</p>;
        return (
            <>
                <div className="d-flex flex-column flex-root">
                    {/*begin::Page*/}
                    <div className="page d-flex flex-row flex-column-fluid">
                        {/*begin::Aside*/}
                        <Asidemenu/>
                        
                        {/*end::Aside*/}
                        {/*begin::Wrapper*/}
                        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                            {/*begin::Header*/}
                           <Header/>
                            {/*end::Header*/}
                            <ToastContainer/>
                            {/*begin::Content*/}
                            <div className="content fs-6 d-flex flex-column flex-column-fluid" id="kt_content">                              
                                <div className="container mt-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10">
                                            <div className="card shadow-lg">
                                                <div className="card-header bg-primary text-white text-center">
                                                    <h1 className="m-9">Edit Marks</h1>
                                                    <Link to="/mark" className="btn btn-light m-9">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                <form onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="student_id" className="form-label">Student Name</label>
                                                            <select
                                                                id="student_id"
                                                                className="form-select"
                                                                name="student_id"
                                                                value={this.state.student_id}
                                                                onChange={(e) => this.handleChange(e)}
                                                            >
                                                                <option value="">Select Student</option>
                                                                {this.state.students.map((student_id) => (
                                                                    <option key={student_id.id} value={student_id.id}>
                                                                        {student_id.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="test_id" className="form-label">Test Name</label>
                                                            <select
                                                                id="test_id"
                                                                className="form-select"
                                                                name="test_id"
                                                                value={this.state.test_id}
                                                                onChange={(e) => this.handleChange(e)}
                                                            >
                                                                <option value="">Select Test Name</option>
                                                                {this.state.tests.map((test_id) => (
                                                                    <option key={test_id.id} value={test_id.id}>
                                                                        {test_id.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="marks ob" className="form-label">Marks Obtained</label>
                                                            <input type="text" className="form-control" id="marks ob" placeholder="Enter marks Obtained" name="marks_obtained" value={this.state.marks_obtained} onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="Graded_at" className="form-label">Graded At</label>
                                                            <input type="date" className="form-control" id="Graded_at" placeholder="Graded At" name="graded_at" value={this.state.graded_at} onChange={this.handleChange} required />
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
export default WithHook(EditMarks);