import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RoleBasedRoute({ allowedRoles }) {

  const { user } = useAuth();

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  

  // User does not have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User has permission
  return <Outlet />;
}

export default RoleBasedRoute;