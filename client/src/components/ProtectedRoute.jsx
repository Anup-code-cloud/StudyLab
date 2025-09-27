// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth ? useAuth() : { token: localStorage.getItem("token"), loading: false };
  const location = useLocation();

  if (loading) {
    return <div className="min-h-[50vh] grid place-items-center">Checking session...</div>;
  }

  if (!token) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
