import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {

  const [search, setSearch] = useState("");

  const stores = [
    {
      store_id: 1,
      store_name: "BlueSky Electronics",
      address: "123 Tech Street, New Delhi, India",
      average_rating: 4,
    },
    {
      store_id: 2,
      store_name: "Urban Mart",
      address: "45 Market Road, Mumbai, India",
      average_rating: 5,
    },
    {
      store_id: 3,
      store_name: "Fresh & Green Grocery",
      address: "78 Park Avenue, Bangalore, India",
      average_rating: 3,
    },
  ];
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get(`/stores`);
      setStores(res.data.slice(0, 6)); // show top 6 stores for featured
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };

  const renderStars = (rating) => {
    const filled = Math.round(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: "gold", fontSize: "1.1rem" }}>★</span>
    ));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "60vh",
          background: "linear-gradient(135deg, #68BBE3, #0E86D4)",
          padding: "50px 20px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>Discover & Rate Stores</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
          Find the best stores in your city and share your experience with other users.
        </p>

          <div>
            <Link  to="/register" className="btn" style={{ backgroundColor: "#003060", color: "#fff", fontSize: "0.9rem" }}> Get Started </Link>
          </div>
      </div>

      {/* Featured Stores */}
        <div className="container mt-5" style={{
          minHeight: "60vh",
          background: "linear-gradient(135deg, #0E86D4, #84b5dbff)",
          padding: "50px 20px",
          borderRadius: "12px",
        }}>
      <h2 style={{ color: "#003060", fontWeight: "bold", marginBottom: "30px" }}>
        Featured Stores
      </h2>
      <div className="row">
        {stores.map((store) => (
          <div className="col-md-4 mb-4" key={store.store_id}>
            <div
              className="card h-100 shadow"
              style={{
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #0E86D4, #055C9D)",
                color: "#fff",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{store.store_name}</h5>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {store.address}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div>
                    {store.average_rating
                      ? renderStars(store.average_rating)
                      : "No ratings yet"}
                  </div>
                  <Link
                    className="btn"
                    style={{
                      backgroundColor: "#003060",
                      color: "#fff",
                      fontSize: "0.9rem",
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Call to Action Section */}
      <div
        className="text-center mt-5 p-5"
        style={{
          background: "#055C9D",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Become a Store Reviewer!</h3>
        <p>Sign up today to rate your favorite stores and help the community discover the best experiences.</p>
        <Link
          to="/register"
          className="btn"
          style={{
            backgroundColor: "#003060",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "6px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#68BBE3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#003060")}
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
