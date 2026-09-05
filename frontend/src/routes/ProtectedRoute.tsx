import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth";

type ProtectedRouteProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
