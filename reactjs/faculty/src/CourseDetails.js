import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null
    };
  }

  componentDidMount() {
    const courseId = this.props.params.id;
    console.log("Course ID:", courseId); // Debug
  
    if (courseId) {
      this.fetchCourseDetails(courseId);
    } else {
      console.error("No course ID found in route.");
    }
  }
  

  fetchCourseDetails = (id) => {
    axios.get(`http://127.0.0.1:5000/courses/${id}`)
    .then((response) => {
      console.log("API Response:", response.data);
      this.setState({ course: response.data });
    })
      .catch((error) => {
        console.error("Error fetching course:", error);
        alert("Failed to fetch course details.");
      });
  };

  render() {
    //const { course } = this.state;
    return (
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* /Header */}
        {/* Latest Blog */}
        <section className="section latest-blog">
          <div className="container mt-5">
            <div className="container mt-5">
              {this.state.course != null &&this.state.course.length > 0 ? (
                this.state.course.map((course, index) => (
                  <div key={index} className="p-4 bg-light rounded mb-4">
                    <h2 className="text-center">{course.name}</h2>
                    <p><strong>Instructor:</strong> {course.first_name} {course.last_name}</p>
                    <p><strong>Description:</strong> {course.description}</p>

                    {/* <ul className="list-unstyled">
                      <li className="d-flex align-items-center justify-content-between gap-4">
                        <Link to={`/test/${course.id}`} className="btn btn-light-danger mx-15 w-50">Test</Link>
                        <Link to={`/assignment/${course.id}`} className="btn btn-light-danger w-50">Assignments</Link>
                      </li>
                    </ul> */}

                   
                  </div>
               ))
              ) : (
                <div>No courses available</div>
              )}
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
export default WithHook(CourseDetails);

