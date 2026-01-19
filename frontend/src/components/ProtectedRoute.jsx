import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const routeMap = {
  "/dashboard": "DASHBOARD",
  "/dashboard/user-management": "USERS",
  "/dashboard/onboarding": "ONBOARDING",
  "/dashboard/cost-explorer": "COST",
  "/dashboard/aws-services": "AWS",
};

export default function ProtectedRoute() {
  const { isLoggedIn, canAccess } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
 // return <Navigate to="/" replace />;
  }

  const pageKey = routeMap[location.pathname];

  if (pageKey && !canAccess(pageKey)) {
    // return <Navigate to="/dashboard" />;
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
}
