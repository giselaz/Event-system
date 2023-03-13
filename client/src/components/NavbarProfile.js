import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";

const NavbarProfile = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user && user.role === "user") {
      return "/profile";
    } else if (user && user.role === "admin") {
      return "/admin";
    } else {
      return "/login";
    }
  };
  const handleIconClick = () => {
    const route = handleRoute();
    navigate(route);
  };
  return (
    <Nav.Link onClick={handleIconClick}>
      <i className="ni ni-circle-08" style={{ fontSize: 25 }}></i>
    </Nav.Link>
  );
};

export default NavbarProfile;
