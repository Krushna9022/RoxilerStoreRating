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

  // Render star rating
  const renderStars = (rating) => {
    const filled = Math.round(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < filled ? 'gold' : 'lightgray', fontSize: '1.2rem' }}>★</span>
    ));
  };

  return (
    <div className="container mt-5 bg-dark text-light">
      <h3>All Stores</h3>

      {/* Search bar */}
      <div className="mb-3 d-flex">
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
                    <strong>Average Rating:</strong> {store.average_rating ?? 'N/A'}{' '}
                    {store.average_rating && renderStars(store.average_rating)}
                  </p>
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
