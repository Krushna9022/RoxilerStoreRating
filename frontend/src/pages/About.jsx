import React from "react";

const About = () => {
  return (
    <div
      className="container mt-5 p-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #68BBE3, #0E86D4)",
        borderRadius: "12px",
        color: "#003060",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>About StoreRating</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
          StoreRating is your go-to platform to discover, rate, and share reviews of your favorite stores. 
          Our mission is to create a trustworthy community where users can find the best shopping experiences.
        </p>
      </div>

      {/* Features Section */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div
            className="p-4 h-100 shadow"
            style={{
              backgroundColor: "#055C9D",
              color: "#fff",
              borderRadius: "12px",
              transition: "0.3s",
            }}
          >
            <h3>Discover Stores</h3>
            <p>Browse and explore stores around you. Find top-rated and trending places in just a few clicks.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="p-4 h-100 shadow"
            style={{
              backgroundColor: "#0E86D4",
              color: "#fff",
              borderRadius: "12px",
              transition: "0.3s",
            }}
          >
            <h3>Rate & Review</h3>
            <p>Share your experience with others. Add ratings and reviews to help the community make informed choices.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="p-4 h-100 shadow"
            style={{
              backgroundColor: "#003060",
              color: "#fff",
              borderRadius: "12px",
              transition: "0.3s",
            }}
          >
            <h3>Trusted Community</h3>
            <p>Join a platform with verified users, transparent ratings, and authentic reviews to make better decisions.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="text-center mt-5 p-4"
        style={{
          backgroundColor: "#055C9D",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontWeight: "bold", color: "#fff" }}>Join Our Community Today!</h2>
        <p style={{ color: "#fff" }}>Sign up to rate your favorite stores and help others discover the best experiences.</p>
        <a
          href="/register"
          className="btn"
          style={{
            backgroundColor: "#003060",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "1rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#68BBE3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#003060")}
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

export default About;
