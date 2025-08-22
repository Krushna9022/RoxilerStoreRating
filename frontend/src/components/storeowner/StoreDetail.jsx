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

  if (loading) return <p className="text-center mt-4">Loading ratings...</p>;

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={goBack}>
        ← Back to Stores
      </button>
      <h4>Ratings for: {store.store_name}</h4>
      {ratings.length === 0 ? (
        <p>No ratings yet for this store.</p>
      ) : (
        <div className="list-group">
          {ratings.map((r) => (
            <div className="list-group-item" key={r.user_id}>
              <h6>{r.user_name} ({r.user_email})</h6>
              <p>
                Rating: {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
              </p>
              <small>Submitted on: {new Date(r.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
