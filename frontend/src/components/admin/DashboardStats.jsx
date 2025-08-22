import { useEffect, useState } from "react";
import api from "../../services/api";

const DashboardStats = () => {
  const [stats, setStats] = useState({ total_users: 0, total_stores: 0, total_ratings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users/stats");
        setStats(res.data || {});
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-3">{stats.total_users}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Stores</h5>
              <p className="card-text fs-3">{stats.total_stores}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Total Ratings</h5>
              <p className="card-text fs-3">{stats.total_ratings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
