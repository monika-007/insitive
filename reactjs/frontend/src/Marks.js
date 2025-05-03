import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
export default class Marks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: []
  };
}
componentDidMount() {
  this.fetchMark();
}

fetchMark = () => {
  axios.get("http://127.0.0.1:5000/marks")
    .then(response => {
      this.setState({ marks: response.data });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    });
}

render() {
  return (
    <div className="main-wrapper">
      {/* Header */}
      <Header />
      {/* /Header */}
      {/* Course */}
      <section className="section latest-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 d-flex">
                  <div className="course-box course-design list-course d-flex w-100">
                    <div className="product w-100">
                      <div className="product-content">
                        {/* Course Header */}
                        <div className="course-group d-flex mb-3 align-items-center">
                          <div className="course-group-img d-flex align-items-center">
                            <h3><b>Marks</b></h3>
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="course-details">
                          {this.state.marks.length > 0 ? (
                            this.state.marks.map((mark, index) => (
                              <div
                                key={index}
                                className="course-item d-flex justify-content-between align-items-center border-bottom py-2"
                              >
                                <div>
                                  <h5 className="mb-1">{mark.test_name}</h5>
                                  <small className="text-muted">
                                    {mark.first_name + " " + mark.last_name} | {mark.graded_at}
                                  </small>
                                </div>
                                <div className="text-end">
                                  <h5 className="mb-1">{mark.marks_obtained}</h5>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-3">
                              <h6>No marks available</h6>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
           
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  );
}
}

