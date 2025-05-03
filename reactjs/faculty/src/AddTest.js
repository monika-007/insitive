import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";
class AddTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test_name: "",
      duration: "",
      test_date: "",
      subject_id: "",
      total_marks: "",
      subjects: []
    };
  }

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = () => {
    axios
      .get("http://127.0.0.1:5000/test_schedule/subjects")
      .then((response) => {
        console.log("Fetched subjects:", response.data); // Debugging log

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
    const apiAddress = "http://127.0.0.1:5000/test_schedule";
    let form = new FormData();
    form.append("test_name", this.state.test_name)
    form.append("duration", this.state.duration);
    form.append("test_date", this.state.test_date);
    form.append("total_marks", this.state.total_marks);
    form.append("subject_id", this.state.subject_id);
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

          this.setState({ test_name: "", duration: "", test_date: "", total_marks: "", subject_id: "" });

          setTimeout(() => {
            this.props.navigate("/test");
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
                    <h4>Test</h4>
                    <Link className="btn btn-light" to="/test">Back</Link>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="test_name" className="form-label">Test Name</label>
                        <input type="text" className="form-control" id="test_name" placeholder="Enter test name" name="test_name" value={this.state.test_name} onChange={this.handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="subject_id" className="form-label">Subject Name</label>
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
                        <label htmlFor="test_date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="test_date" placeholder="Enter date" name="test_date" value={this.state.test_date} onChange={this.handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input type="number" className="form-control" id="duration" placeholder="Enter duration" name="duration" value={this.state.duration} onChange={this.handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="marks" className="form-label">Total Marks</label>
                        <input type="number" className="form-control" id="marks" placeholder="Enter total marks" name="total_marks" value={this.state.total_marks} onChange={this.handleChange} required />
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
export default WithHook(AddTest);