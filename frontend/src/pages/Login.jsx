import { useState } from 'react';
import api from '../services/api';
import { saveToken, getRole } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      saveToken(res.data.token);
      setIsLoggedIn(true)

      const role = getRole();
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'store_owner') navigate('/owner/dashboard');

      else navigate('/user/stores');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
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
        className="card p-4 shadow-lg text-dark"
        style={{
          width: '380px',
          borderRadius: '15px',
          backgroundColor: '#fff',
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: '#055C9D' }}>
          Login
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
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
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn w-100 mb-3"
            style={{
              backgroundColor: '#0E86D4',
              color: '#fff',
              fontWeight: '600',
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0">
            New user?{' '}
            <Link to="/register" style={{ color: '#055C9D', fontWeight: '600' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
