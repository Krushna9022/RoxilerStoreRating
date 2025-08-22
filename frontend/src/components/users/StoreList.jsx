import { useEffect, useState } from "react";
import api from "../../services/api";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [userRatings, setUserRatings] = useState({}); // storeId -> rating
  const [ratingIds, setRatingIds] = useState({}); // storeId -> rating_id
  const [message, setMessage] = useState("");

  // Fetch stores
  const fetchStores = async () => {
    try {
      const res = await api.get(`/stores/list?name=${search}`);
      setStores(res.data);

      // Pre-fill user ratings & rating IDs
      const ratingObj = {};
      const ratingIdObj = {};
      res.data.forEach((store) => {
        if (store.user_rating) {
          ratingObj[store.id] = store.user_rating;
        }
        if (store.rating_id) {
          ratingIdObj[store.id] = store.rating_id;
        }
      });
      setUserRatings(ratingObj);
      setRatingIds(ratingIdObj);
    } catch (err) {
      console.error("Error fetching stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle star click
  const handleStarClick = async (storeId, value) => {
    // Optimistic UI update
    setUserRatings({ ...userRatings, [storeId]: value });

    try {
      if (ratingIds[storeId]) {
        // Update existing rating
        await api.put(`/ratings/${ratingIds[storeId]}`, { value });
      } else {
        // Create new rating
        const res = await api.post("/ratings", { store_id: storeId, value });
        if (res.data?.rating_id) {
          setRatingIds({
            ...ratingIds,
            [storeId]: res.data.rating_id,
          });
        }
      }

      setMessage("Rating submitted/updated successfully ✅");
      fetchStores(); // refresh averages
    } catch (err) {
      console.error("Error submitting rating:", err.response?.data || err.message);
      setMessage(err.response?.data?.msg || "Failed to submit rating ❌");
    }
  };

  // Render star rating
  const renderStars = (storeId) => {
    const currentRating = userRatings[storeId] || 0;
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          onClick={() => handleStarClick(storeId, starValue)}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            color: starValue <= currentRating ? "gold" : "lightgray",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Stores</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Search bar */}
      <div className="mb-4 d-flex">
        <input
          className="form-control me-2"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchStores}>
          Search
        </button>
      </div>

      {/* Store cards */}
      <div className="row">
        {stores.length > 0 ? (
          stores.map((store) => (
            <div className="col-md-4 mb-4" key={store.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{store.name}</h5>
                  <p className="card-text">{store.address}</p>
                  <p>
                    <strong>Overall Rating:</strong>{" "}
                    {store.average_rating ?? "N/A"}
                  </p>
                  <div>
                    <strong>Your Rating: </strong>
                    {renderStars(store.id)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No stores found</p>
        )}
      </div>
    </div>
  );
};

export default StoreList;
