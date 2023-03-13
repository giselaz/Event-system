import React from "react";
import Container from "react-bootstrap/Container";
import Login from "../auth/Login";
import Landing from "../../screens/Landing";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "../../assets/vendor/nucleo/css/nucleo.css";
import { Link, NavLink } from "react-router-dom";
import classes from "../../screens/MainHeader.module.css";
import NavDepartament from "./NavDepartament";
import NavbarProfile from "../NavbarProfile";

class DemoNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="default" variant="dark">
          <Container>
            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Faqja Kryesore{" "}
                </Nav.Link>

                <NavDepartament />
                <Nav.Link as={Link} href="#pricing">
                  Njoftime
                </Nav.Link>
                <Nav.Link href="#pricing">Kontaktoni</Nav.Link>
              </Nav>
              <Nav>
                {/* <Nav.Link href="#deets">Login</Nav.Link> */}
                <Nav.Link as={Link} to="/login">
                  <Button color="primary" size="sm">
                    Login
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button color="primary" size="sm">
                    Sign up
                  </Button>
                </Nav.Link>
                <NavbarProfile />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default DemoNavbar;
