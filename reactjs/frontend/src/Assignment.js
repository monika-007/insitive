import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from 'axios';
export default class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: []
    };
  }

  componentDidMount() {
    this.fetchAssignment();
  }

  fetchAssignment = () => {
    axios.get('http://127.0.0.1:5000/assignment')
      .then(response => {
        this.setState({ assignment: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data.');
      });
  }

  render() {
    const { assignment } = this.state;
    return (
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* /Header */}
        {/* Latest Blog */}
        <section className="section latest-blog">
          <div className="container mt-5 p-4 bg-light border rounded">
            <div className="p-2 bg-danger-light text-white fw-bold rounded-top">Assignment Details</div>

            {assignment.length > 0 ? (
              assignment.map((item, index) => (
                <div key={index} className="p-3 border mb-4 rounded bg-white shadow-sm">
                  <p className="mb-2">
                    <strong>Subject:</strong> {item.title} <span className="me-3" />
                    <strong>Title:</strong> {item.Name} <span className="me-3" />
                    <strong>Total Marks:</strong> {item.total_marks} <span className="me-3" />
                    <strong>Due Date:</strong> {item.due_date}
                  </p>
                  <div className="mt-3">
                    <p className="mb-1 fw-bold">Description:</p>
                    <p className="mb-0">{item.description}</p>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <p className="mt-3 text-muted">No assignments available</p>
            )}
          </div>
        </section>


        {/* Footer */}
        <Footer />
        {/* /Footer */}
      </div>

    );
  }
}

