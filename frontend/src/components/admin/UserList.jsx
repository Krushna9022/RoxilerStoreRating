import { useEffect, useState } from 'react';
import api from '../../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    const res = await api.get(`/users?role=${roleFilter}`);
    setUsers(res.data);
  };

  return (
    <div
      className="container mt-4 p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #68BBE3, #0E86D4)",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ color: "#003060", marginBottom: "20px", fontWeight: "bold" }}>User List</h3>

      <div className="mb-4">
        <label style={{ color: "#003060", fontWeight: "600" }}>Filter by Role:</label>
        <select
          className="form-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            backgroundColor: "#055C9D",
            color: "#fff",
            fontWeight: "500",
            border: "none",
            borderRadius: "6px",
          }}
        >
          <option value="">All</option>
          <option value="user">Normal User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          className="table text-center"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        >
          <thead style={{ background: "linear-gradient(90deg, #003060, #055C9D)", color: "#fff" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
  {users.map((u, idx) => {
    const bgColor = idx % 2 === 0 ? "#68BBE3" : "#0E86D4"; // alternate row colors
    const hoverColor = "#055C9D"; // hover color

    return (
      <tr
        key={u.id}
        style={{
          backgroundColor: bgColor,
          color: "#003060",
          transition: "0.3s",
          cursor: "default",
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgColor}
      >
        <td style={{ padding: "12px", borderBottom: "1px solid #003060" }}>{u.name}</td>
        <td style={{ padding: "12px", borderBottom: "1px solid #003060" }}>{u.email}</td>
        <td style={{ padding: "12px", borderBottom: "1px solid #003060" }}>{u.role}</td>
        <td style={{ padding: "12px", borderBottom: "1px solid #003060" }}>{u.address}</td>
      </tr>
    );
  })}
</tbody>



        </table>
      </div>
    </div>
  );
};

export default UserList;
