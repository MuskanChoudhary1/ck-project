import "./Dashboard.css";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { name } = useAuth();

  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Welcome {name || "User"}</h1>
      <p className="dash-subtitle">
        cloud management system
      </p>
    </div>
  );
}

export default Dashboard;
