import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import RouteNames from "./RouteNames";

const ProtectedRoute = ({ children }) => {
  const adminData = useSelector((state) => state.auth.adminData);
  const organizationData = useSelector(
    (state) => state.organization.organizationData
  );

  const isAuthenticated = adminData && organizationData;

  if (!isAuthenticated) {
    return <Navigate to={RouteNames.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
