import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/unauthorised", children }) => {
  if (!user || user==null) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
