import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { getUser } = useAuth();
  const location = useLocation();
  const user = getUser();

  if (!user)
    return (
      <Navigate to="/user/login" replace state={{ from: location.pathname }} />
    );

  if (user && allowedRoles && !allowedRoles?.includes(user.role))
    return (
      <Navigate
        to="/me/unauthorized"
        replace
        state={{ from: location.pathname }}
      />
    );

  if (!children) return <Outlet />;

  return <>{children}</>;
};

export default ProtectedRoutes;
