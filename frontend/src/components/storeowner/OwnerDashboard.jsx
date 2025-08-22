import { useState, useEffect } from "react";
import api from "../../services/api";
import StoreDetail from "./StoreDetail";

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/ratings/owner"); // API to get owner stores
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading stores...</p>;

  return (
    <div className="container mt-4">
      <h2>Store Owner Dashboard</h2>
      <div className="row mt-4">
        {selectedStore ? (
          // Render store detail when selected
          <StoreDetail store={selectedStore} goBack={() => setSelectedStore(null)} />
        ) : (
          // Render list of stores
          stores.map((store) => (
            <div className="col-md-4 mb-4" key={store.store_id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{store.store_name}</h5>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => setSelectedStore(store)}
                  >
                    View Ratings
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
