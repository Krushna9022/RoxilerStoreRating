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
        className={`bg-dark text-white p-3 d-flex flex-column flex-shrink-0  ${
          sidebarOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: "220px" }}
      >
        <h4 className="text-center mb-4 mt-5">Admin Panel</h4>
        <nav className="nav flex-column">
          <Link
            className={`nav-link mb-2 ${isActive("/admin/dashboard") ? "bg-primary text-white rounded" : ""}`}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`nav-link mb-2 ${isActive("/admin/add-store") ? "bg-primary text-white rounded" : ""}`}
            to="/admin/add-store"
          >
            Add Store
          </Link>
          <Link
            className={`nav-link mb-2 ${isActive("/admin/stores") ? "bg-primary text-white rounded" : ""}`}
            to="/admin/stores"
          >
            Store List
          </Link>
          <Link
            className={`nav-link mb-2 ${isActive("/admin/users") ? "bg-primary text-white rounded" : ""}`}
            to="/admin/users"
          >
            User List
          </Link>
          <Link  className={`nav-link mb-2 ${isActive("/admin/add-owner") ? "bg-primary text-white rounded" : ""}`} to="/admin/add-owner">
                 Add Store Owner
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <button
          className="btn btn-outline-primary mb-4 d-md-none"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "Hide Menu" : "Show Menu"}
        </button>

        {/* Render the current admin page */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
