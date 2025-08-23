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

  if (loading) return <p className="text-center mt-4" style={{ color: "#003060" }}>Loading stores...</p>;

  return (
    <div
      className="container mt-4 p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #68BBE3, #0E86D4)",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ color: "#003060", fontWeight: "bold", marginBottom: "30px" }}>Store Owner Dashboard</h2>

      <div className="row mt-4">
        {selectedStore ? (
          <StoreDetail store={selectedStore} goBack={() => setSelectedStore(null)} />
        ) : (
          stores.map((store) => (
            <div className="col-md-4 mb-4" key={store.store_id}>
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#055C9D",
                  color: "#fff",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0E86D4")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#055C9D")}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{store.store_name}</h5>
                  <button
                    className="btn"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#0E86D4",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#68BBE3")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E86D4")}
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
