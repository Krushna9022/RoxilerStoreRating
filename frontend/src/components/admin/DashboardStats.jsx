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

  const cardColors = ["#68BBE3", "#0E86D4", "#055C9D"];

  return (
    <div className="">
      <h2 style={{ color: "#003060", fontWeight: "bold" }}>Admin Dashboard</h2>
      <div className="row mt-4">
        {["Total Users", "Total Stores", "Total Ratings"].map((title, idx) => (
          <div className="col-md-4 mb-3" key={idx}>
            <div
              className="card h-100 shadow-sm"
              style={{
                backgroundColor: cardColors[idx],
                color: "#fff",
                borderRadius: "12px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className="card-text fs-3">
                  {idx === 0 ? stats.total_users : idx === 1 ? stats.total_stores : stats.total_ratings}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
