import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // interceptor instance

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.currentPassword || !form.newPassword) {
      setError("Both fields are required");
      return;
    }

    if (!PASSWORD_REGEX.test(form.newPassword)) {
      setError(
        "Password must be 8-16 characters and include at least one uppercase letter and one special character"
      );
      return;
    }

    try {
      const res = await api.put("/me", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess(res.data.msg || "Password updated successfully!");

      setTimeout(() => {
        navigate("/dashboard"); // redirect to dashboard after success
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update password");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center text-primary">Change Password</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className="form-control"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
