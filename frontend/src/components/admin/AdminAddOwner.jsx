import { useState } from "react";
import api from "../../services/api";

const AdminAddOwner = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/create-store-owner", form);
      setMessage(`Store Owner Created! Email: ${res.data.email}, Password: ${res.data.password}`);
      setForm({ name: "", email: "", password: "", address: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to create store owner");
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
        <h3 className="text-center mb-4" style={{ color: "#fff" }}>Create Store Owner</h3>

        {message && (
          <div className="alert" style={{ backgroundColor: "#003060", color: "#fff" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              type="text"
              name="name"
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
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              style={{ borderColor: "#003060" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="text"
              name="password"
              className="form-control"
              value={form.password}
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
              style={{ borderColor: "#003060" }}
            />
          </div>

          <button
            className="btn w-100"
            style={{ backgroundColor: "#003060", color: "#fff" }}
            type="submit"
          >
            Create Store Owner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddOwner;
