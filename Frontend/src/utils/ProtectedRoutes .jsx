import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { getUser } = useAuth();
  const location = useLocation();
  const user = getUser();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    { children }
  ) : user && allowedRoles && !allowedRoles?.includes(user.role) ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
