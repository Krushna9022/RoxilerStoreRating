import { useEffect, useState } from 'react';
import api from '../../services/api';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get(`/stores?name=${search}`);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  const renderStars = (rating) => {
    const filled = Math.round(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < filled ? 'gold' : '#ccc', fontSize: '1.2rem' }}>★</span>
    ));
  };

  return (
    <div
      className="container mt-5 p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #68BBE3, #0E86D4)",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ color: "#003060", marginBottom: "20px", fontWeight: "bold" }}>All Stores</h3>

      {/* Search */}
      <div className="mb-4 d-flex">
        <input
          className="form-control me-2"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderColor: "#003060",
            backgroundColor: "#055C9D",
            color: "#fff"
          }}
        />
        <button
          className="btn"
          style={{ backgroundColor: "#003060", color: "#fff" }}
          onClick={fetchStores}
        >
          Search
        </button>
      </div>

      {/* Store cards */}
      <div className="row">
        {stores.length > 0 ? (
          stores.map((store) => (
            <div className="col-md-4 mb-4" key={store.id}>
              <div
                className="card shadow-sm h-100"
                style={{ borderRadius: "12px", backgroundColor: "#055C9D", color: "#fff" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{store.name}</h5>
                  <p className="card-text">{store.address}</p>
                  <p>
                    <strong>Average Rating:</strong> {store.average_rating ?? 'N/A'}{' '}
                    {store.average_rating && renderStars(store.average_rating)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center" style={{ color: "#003060" }}>No stores found</p>
        )}
      </div>
    </div>
  );
};

export default StoreList;
