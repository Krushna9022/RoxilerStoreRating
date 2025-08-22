import { useState, useEffect } from 'react';
import api from '../../services/api';

const AddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', owner_id: '' });
  const [message, setMessage] = useState('');
  const [owners, setOwners] = useState([]); // store owners list

  // Fetch store owners from backend
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await api.get('/users'); // fetch all users
        const storeOwners = res.data.filter((user) => user.role === 'store_owner'); // filter owners
        setOwners(storeOwners);
      } catch (err) {
        console.error('Failed to fetch owners:', err);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <div className="container mt-4">
      <h3>Add New Store</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Store Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={form.name}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            onChange={handleChange}
            value={form.address}
            required
          />
        </div>

        <div className="mb-3">
          <label>Owner</label>
          <select
            name="owner_id"
            className="form-select"
            value={form.owner_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;
