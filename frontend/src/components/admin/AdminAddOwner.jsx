import { useState } from "react";
import api from "../../services/api";

const AdminAddOwner = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/create-store-owner", form);
      setMessage(`Store Owner Created! Email: ${res.data.email}, Password: ${res.data.password}`);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to create store owner");
    }
  };

  return (
    <div className="container ">
      <h3>Create Store Owner</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} value={form.name} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} value={form.email} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="text" name="password" className="form-control" onChange={handleChange} value={form.password} required />
        </div>
        <button className="btn btn-success">Create Store Owner</button>
      </form>
    </div>
  );
};

export default AdminAddOwner;
