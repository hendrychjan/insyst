import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
