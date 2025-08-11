import classes from "./Header.module.css";
import logo1 from "../../../assets/images/event-logo1.png";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/esm/Container";
// import {Button as HeaderButton} from "react-bootstrap/esm/Button";
import Button from "../Button";

const Header = () => {
  const navToggleX = () => {
    console.log(document.querySelector(".custom-toggler"));
    const navbarToggler = document.querySelector(".custom-toggler");
    navbarToggler.classList.toggle("open");
    console.log(document.querySelector(".custom-toggler"));
  };
  return (
    <>
      <Navbar
        className={`${classes.navbarCustom} `}
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand href="/">
          <img className={classes.logo} src={logo1} />
        </Navbar.Brand>
        <Container className={classes.navContainer}>
          <Navbar.Toggle
            className="custom-toggler"
            aria-controls="responsive-navbar-nav"
            data-bs-toggle="collapse"
            data-bs-target="#responsive-navbar-nav"
            onClick={navToggleX}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            className={classes.navCollapse}
            id="responsive-navbar-nav"
          >
            <Nav className={`${classes.navList} me-auto`}>
              <Nav.Link as={Link} to="/" className={classes.navItem}>
                Home
              </Nav.Link>
              <NavDropdown
                title="Find Events"
                className={classes.navItem}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className={classes.navItem} as={Link} to="/">
                Vendors
              </Nav.Link>
              <Nav.Link className={classes.navItem} as={Link} to="/">
                Find Tickets
              </Nav.Link>
              <Nav.Link className={classes.navItem} as={Link} to="/">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Button isdark={1} to={'signup'}>Create Events</Button>{" "}
      </Navbar>
    </>
  );
};

export default Header;
