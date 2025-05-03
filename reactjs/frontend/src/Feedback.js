import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: "",
      user_id: 1, // You can update this dynamically based on your auth/user system
      message: "",
    };
  }

  handleStarClick = (value) => {
    this.setState({ rating: value });
  };

  handleChange = (e) => {
    this.setState({ review: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { user_id, rating, review } = this.state;

    try {
      const res = await fetch("http://127.0.0.1:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, rating, review }),
      });

      const data = await res.json();

      if (data[0].error === "no") {
        this.setState({ message: data[2].message, review: "", rating: 0 });
      } else {
        this.setState({ message: data[0].error });
      }
    } catch (err) {
      this.setState({ message: "An error occurred while submitting feedback." });
    }
  };

  renderStars = () => {
    const { rating } = this.state;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          data-value={i}
          onClick={() => this.handleStarClick(i)}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: i <= rating ? "#FFD700" : "#ddd",
            transition: "color 0.3s",
          }}
        />
      );
    }

    return stars;
  };

  render() {
    const { review, message } = this.state;

    return (
      <div className="main-wrapper">
        <Header />
        <section className="section latest-blog">
          <div className="container d-flex justify-content-center align-items-center vh-100">
            <div
              style={{
                maxWidth: "500px",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-center">We Value Your Feedback</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3 text-center">
                  <label className="form-label">Rate Us</label>
                  <div
                    className="star-rating"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {this.renderStars()}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">
                    Your Feedback
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    rows={3}
                    placeholder="Tell us what you think..."
                    value={review}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#FFE1DE", color: "#000" }}
                  >
                    Submit
                  </button>
                </div>
                {message && (
                  <p className="text-center mt-3" style={{ color: "#333" }}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
