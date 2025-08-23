import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/roxiler_systems_logo.png";
import { getRole, removeToken } from "../utils/auth";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const role = getRole();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(90deg, #003060, #055C9D, #0E86D4)",
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center text-white"
          to="/"
        >
          <img src={logo} alt="Logo" height="40" className="me-2" />
          StoreRating
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/stores">
                Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/about">
                About
              </Link>
            </li>

            {/* Conditional Dashboard Links */}
            {isLoggedIn && role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning fw-semibold"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && role === "store_owner" && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning fw-semibold"
                  to="/owner/dashboard"
                >
                  Store Owner
                </Link>
              </li>
            )}

            {/* Auth Buttons or Profile Dropdown */}
            {isLoggedIn ? (
              <li className="nav-item dropdown ms-3">
                <button
                  className="btn btn-sm dropdown-toggle"
                  style={{
                    backgroundColor: "#68BBE3",
                    color: "#003060",
                    fontWeight: "600",
                  }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Profile
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    dropdownOpen ? "show" : ""
                  }`}
                >
                  <li>
                    <Link className="dropdown-item" to="/change-password">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <Link
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#68BBE3",
                      color: "#003060",
                      fontWeight: "600",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link
                    className="btn btn-sm border border-light text-white"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
