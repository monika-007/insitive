import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";

class AddMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      test_id: "",
      marks_obtained: "",
      graded_at: "",
      students: [],
      tests: []
    };
  }

  componentDidMount() {
    // Fetch students
    axios.get("http://127.0.0.1:5000/marks/students")
      .then(response => {
        console.log("Fetched students:", response.data); // Debugging log

        // Map API response to correct format
        const students = response.data.map((student) => ({
          id: student.student_id,
          name: `${student.first_name} ${student.last_name}`
        }));

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
      })
      .catch((error) => console.error("Error fetching tests:", error));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const apiAddress = "http://127.0.0.1:5000/marks";
    let form = new FormData();
    form.append("student_id", this.state.student_id);
    form.append("test_id", this.state.test_id);
    form.append("marks_obtained", this.state.marks_obtained);
    form.append("graded_at", this.state.graded_at);

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

          this.setState({ student_id: "", test_id: "", marks_obtained: "", graded_at: "" });

          setTimeout(() => {
            this.props.navigate("/mark");
          }, 1000);
        }
      }
    }).catch(error => alert("Network error: " + error));
  };
  render() {
    return (
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* /Header */}
        {/* Home Banner */}
        <section className="section latest-blog">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card shadow-lg">
                  <div className="card-header bg-danger-light text-white d-flex justify-content-between align-items-center">
                    <h4>Marks</h4>
                    <Link className="btn btn-light" to="/mark">Back</Link>
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
                      <button className="btn ms-auto w-100" style={{ backgroundColor: "#FFE2DF", color: "#000" }} >Add</button>
                    </form>
                  </div>
                </div>
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
export default WithHook(AddMarks);