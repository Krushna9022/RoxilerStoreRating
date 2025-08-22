import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className={`text-white p-3 d-flex flex-column flex-shrink-0 shadow-lg ${
          sidebarOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{
          width: "240px",
          background: "linear-gradient(180deg, #055C9D, #0E86D4)",
        }}
      >
        <h4
          className="text-center mb-4 mt-3 fw-bold"
          style={{ color: "#68BBE3" }}
        >
          Admin Panel
        </h4>
        <nav className="nav flex-column">
          <Link
            className={`nav-link text-white mb-2 py-2 px-3 rounded ${
              isActive("/admin/dashboard")
                ? "active-link"
                : "hover-link"
            }`}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`nav-link text-white mb-2 py-2 px-3 rounded ${
              isActive("/admin/add-store")
                ? "active-link"
                : "hover-link"
            }`}
            to="/admin/add-store"
          >
            Add Store
          </Link>
          <Link
            className={`nav-link text-white mb-2 py-2 px-3 rounded ${
              isActive("/admin/stores")
                ? "active-link"
                : "hover-link"
            }`}
            to="/admin/stores"
          >
            Store List
          </Link>
          <Link
            className={`nav-link text-white mb-2 py-2 px-3 rounded ${
              isActive("/admin/users")
                ? "active-link"
                : "hover-link"
            }`}
            to="/admin/users"
          >
            User List
          </Link>
          <Link
            className={`nav-link text-white mb-2 py-2 px-3 rounded ${
              isActive("/admin/add-owner")
                ? "active-link"
                : "hover-link"
            }`}
            to="/admin/add-owner"
          >
            Add Store Owner
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#f4f6f9",
        }}
      >
        <button
          className="btn mb-4 d-md-none rounded-pill px-4 shadow-sm"
          style={{
            backgroundColor: "#0E86D4",
            color: "white",
            border: "none",
          }}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "Hide Menu" : "Show Menu"}
        </button>

        <div
          className="bg-white p-4 rounded shadow-sm"
          style={{
            minHeight: "80vh",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Render the current admin page */}
          <Outlet />
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .hover-link:hover {
            background: #68BBE3;
            color: #003060 !important;
            transition: 0.3s;
          }
          .active-link {
            background: #68BBE3 !important;
            color: #003060 !important;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;
