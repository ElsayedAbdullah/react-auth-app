import { ReactNode } from "react";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: ReactNode;
  redirectPath: string;
}

const ProtectedRoute = ({ children, redirectPath }: IProtectedRoute) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return (
      <Navigate to={redirectPath} replace state={{ path: location.pathname }} />
    );
  }
  return children;
};

export default ProtectedRoute;
