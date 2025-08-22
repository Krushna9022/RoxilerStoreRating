import { useState, useEffect } from 'react';
import api from '../../services/api';

const AddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', owner_id: '' });
  const [message, setMessage] = useState('');
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await api.get('/users');
        const storeOwners = res.data.filter((user) => user.role === 'store_owner');
        setOwners(storeOwners);
      } catch (err) {
        console.error('Failed to fetch owners:', err);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/stores', form);
      setMessage('Store added successfully!');
      setForm({ name: '', email: '', address: '', owner_id: '' });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add store.');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-start p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #68BBE3, #0E86D4)"
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "500px", borderRadius: "12px", backgroundColor: "#055C9D" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#fff" }}>Add New Store</h3>

        {message && (
          <div className="alert" style={{ backgroundColor: "#003060", color: "#fff" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Store Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
              style={{ borderColor: "#003060" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              style={{ borderColor: "#003060" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Address</label>
            <textarea
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
              required
              style={{ borderColor: "#003060" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Owner</label>
            <select
              name="owner_id"
              className="form-select"
              value={form.owner_id}
              onChange={handleChange}
              required
              style={{ borderColor: "#003060", backgroundColor: "#68BBE3", color: "#003060" }}
            >
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn w-100"
            style={{ backgroundColor: "#003060", color: "#fff" }}
            type="submit"
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
