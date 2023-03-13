import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("currentUser");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
