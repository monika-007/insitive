import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            faculty_id: "",
            teachers: [],
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
         // Fetch existing course data
         axios.get(`http://127.0.0.1:5000/courses/${id}`)
         .then(response => {
             console.log("Fetched course details:", response.data);
             if (response.data.length > 0) {
                 this.setState({
                     name: response.data[0].name,
                     description: response.data[0].description,
                     faculty_id: response.data[0].faculty_id,
                     loading: false
                 });
             }
         })
         .catch(error => console.error("Error fetching marks:", error));
     
         axios
         .get("http://127.0.0.1:5000/courses/faculty")
         .then((response) => {
             console.log("Fetched Teachers:", response.data); // Debugging log

             // Map API response to correct format
             const teachers = response.data.map((faculty) => ({
                 id: faculty.faculty_id,
                 name: `${faculty.first_name} ${faculty.last_name}`
             }));

             this.setState({ teachers });
         })
         .catch((error) => console.error("Error fetching teachers:", error));
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id  = this.props.params.id;
        const apiAddress = `http://127.0.0.1:5000/courses`;
        let form = new FormData();
        form.append("name", this.state.name)
        form.append("description", this.state.description);
        form.append("faculty_id", this.state.faculty_id);
        form.append("id",id);

        axios({
            method: 'put',  // Change to PUT method
            responseType: 'json',
            url: apiAddress,
            data: form,
            headers: { 'Content-Type': 'application/json' } // Ensure JSON format
        })
        .then((response) => {
            console.log("course updated:", response.data);
        
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
                   alert("course updated successfully!");                    
                   this.setState({ name: "", description: "", faculty_id: "" });
                   setTimeout(() => {
                        this.props.navigate("/course");
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
                                {/*begin::Toolbar*/}
                                {/*end::Toolbar*/}
                                <div className="container mt-3">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10">
                                            <div className="card shadow-lg">
                                                <div className="card-header bg-primary text-white text-center">
                                                    <h3 className="m-7 py-3">Edit Course</h3>
                                                    <Link to="/course" className="btn btn-light m-9">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Edit Course Name</label>
                                                            <input type="text" className="form-control" id="name" placeholder="Enter coursename" name="name" required value={this.state.name}
                                                                onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="description" className="form-label">Edit Description</label>
                                                            <input type="text" className="form-control" id="description" placeholder="Enter course description" name="description" required value={this.state.description}
                                                                onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="faculty_id" className="form-label">Edit Faculty</label>
                                                            <select
                                                                id="faculty_id"
                                                                className="form-select"
                                                                name="faculty_id"
                                                                value={this.state.faculty_id}
                                                                onChange={(e) => this.handleChange(e)}
                                                            >
                                                                <option value="">Select Teacher</option>
                                                                {this.state.teachers.map((faculty_id) => (
                                                                    <option key={faculty_id.id} value={faculty_id.id}>
                                                                        {faculty_id.name}
                                                                    </option>
                                                                ))}
                                                            </select>
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
                    </div >
                    {/*end::Page*/}
                </div >
            </>
        );
    }
}
export default WithHook(EditCourse);