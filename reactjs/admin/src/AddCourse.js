import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import Asidemenu from './Asidemenu';
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            faculty_id: "",
            teachers: []
        };
    }

    componentDidMount() {
        this.fetchTeachers();
    }

    fetchTeachers = () => {
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
    };

    updateValue = (event) => {
        console.log("Target Name:", event.target.name);
        console.log("Target Value:", event.target.value);
        if (!event.target.name) {
            console.error("Input field is missing the name attribute!");
            return;
        }
        this.setState({ [event.target.name]: event.target.value });
    };


    submitCourse = (e) => {
        e.preventDefault();

        const apiAddress = "http://127.0.0.1:5000/courses";
        let form = new FormData();
        form.append("name", this.state.name)
        form.append("description", this.state.description);
        form.append("faculty_id", this.state.faculty_id);

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

                    this.setState({ name: "", description: "", faculty_id: "" });
                    setTimeout(() => {
                        //const navigate = useNavigate("course");
                        this.props.navigate("/course");
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
                                {/*begin::Toolbar*/}
                                {/*end::Toolbar*/}
                                <div className="container mt-3">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10">
                                            <div className="card shadow-lg">
                                                <div className="card-header bg-primary text-white text-center">
                                                    <h3 className="m-7 py-3">ADD Course</h3>
                                                    <Link to="/course" className="btn btn-light m-9">Back</Link>
                                                </div>
                                                <div className="card-body">
                                                    <form onSubmit={this.submitCourse}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Course Name</label>
                                                            <input type="text" className="form-control" id="name" placeholder="Enter coursename" name="name" required value={this.state.name}
                                                                onChange={(e) => this.updateValue(e)} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="description" className="form-label">Description</label>
                                                            <input type="text" className="form-control" id="description" placeholder="Enter course description" name="description" required value={this.state.description}
                                                                onChange={(e) => this.updateValue(e)} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="faculty_id" className="form-label">Faculty</label>
                                                            <select
                                                                id="faculty_id"
                                                                className="form-select"
                                                                name="faculty_id"
                                                                value={this.state.faculty_id}
                                                                onChange={(e) => this.updateValue(e)}
                                                            >
                                                                <option value="">Select Teacher</option>
                                                                {this.state.teachers.map((faculty_id) => (
                                                                    <option key={faculty_id.id} value={faculty_id.id}>
                                                                        {faculty_id.name}
                                                                    </option>
                                                                ))}
                                                            </select>
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
export default WithHook(AddCourse);