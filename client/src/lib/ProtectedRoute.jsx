import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = !!userInfo;
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the last visited path, except for the login/auth page
    localStorage.setItem("lastVisitedPath", location.pathname);

    return <Navigate to="/auth" replace />;
  }

  return children;
};
