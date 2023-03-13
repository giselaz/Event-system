import { Navigate, Outlet } from "react-router-dom";

function RouteAdmin() {
  const isAuthenticated = JSON.parse(localStorage.getItem("userData"));
  return isAuthenticated && isAuthenticated.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
export default RouteAdmin;
