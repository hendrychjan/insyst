import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optionally replace with a spinner or loading component
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
