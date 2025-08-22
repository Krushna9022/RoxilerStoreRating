import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #68BBE3, #0E86D4, #055C9D, #003060)',
      }}
    >
      <div
        className="card p-4 shadow-lg text-white"
        style={{
          width: '400px',
          borderRadius: '12px',
          background: '#003060', // Deep navy for card
        }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              minLength={3}
              maxLength={60}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter your address"
              onChange={handleChange}
              maxLength={400}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter a password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn w-100 mb-3"
            style={{ backgroundColor: '#0E86D4', color: '#fff' }}
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0">
            Already have an account?{' '}
            <Link
              to="/login"
              className="fw-bold"
              style={{ color: '#68BBE3', textDecoration: 'none' }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
