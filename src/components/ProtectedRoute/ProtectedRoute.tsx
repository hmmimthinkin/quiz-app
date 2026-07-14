import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;