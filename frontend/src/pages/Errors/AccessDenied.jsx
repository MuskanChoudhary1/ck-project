import "./AccessDenied.css";

import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="access-denied-page">
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>

      <button onClick={() => navigate("/dashboard")}>
        Go Back to Dashboard
      </button>
    </div>
  );
}
