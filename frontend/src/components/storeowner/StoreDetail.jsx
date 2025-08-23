import { useEffect, useState } from "react";
import api from "../../services/api";

const StoreDetail = ({ store, goBack }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRatings();
  }, [store]);

  const fetchRatings = async () => {
    try {
      const res = await api.get(`/ratings/owner`); // returns all store ratings grouped
      const storeData = res.data.find((s) => s.store_id === store.store_id);
      setRatings(storeData?.ratings || []);
    } catch (err) {
      console.error("Failed to fetch ratings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4" style={{ color: "#003060" }}>Loading ratings...</p>;

  return (
    <div className="mt-3">
      <button
        className="btn mb-3"
        onClick={goBack}
        style={{
          backgroundColor: "#0E86D4",
          color: "#fff",
          borderRadius: "6px",
          padding: "8px 16px",
          fontWeight: "600",
          border: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#68BBE3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E86D4")}
      >
        ← Back to Stores
      </button>

      <h4 style={{ color: "#003060", fontWeight: "bold", marginBottom: "20px" }}>
        Ratings for: {store.store_name}
      </h4>

      {ratings.length === 0 ? (
        <p style={{ color: "#055C9D" }}>No ratings yet for this store.</p>
      ) : (
        <div className="row">
          {ratings.map((r) => (
            <div className="col-md-6 mb-4" key={r.user_id}>
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  border: "1px solid #0E86D4",
                  transition: "0.3s",
                }}
              >
                <div className="card-body">
                  <h6 style={{ color: "#003060", fontWeight: "bold" }}>
                    {r.user_name} <small style={{ color: "#055C9D" }}>({r.user_email})</small>
                  </h6>
                  <p style={{ fontSize: "18px", color: "#FFD700" }}>
                    {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                  </p>
                  <small style={{ color: "#555" }}>
                    Submitted on: {new Date(r.created_at).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
