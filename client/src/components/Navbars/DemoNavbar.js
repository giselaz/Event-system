import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Link, NavLink } from "react-router-dom";
import "../../screens/MainHeader.css";

import NavbarProfile from "../NavbarProfile";
import logo from "../../assets/img/brand/uniLogo22.png";

function DemoNavbar() {
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        document.querySelector(".navbar").classList.remove("hidden-nav");
        document.querySelector(".navbar").classList.add("navbar-scroll");
      } else {
        document.querySelector(".navbar").classList.remove("navbar-scroll");
        document.querySelector(".navbar").classList.add("hidden-nav");
      }
      prevScrollPos = currentScrollPos;
    };
  }, []);

  const navToggleX = () => {
    console.log(document.querySelector(".custom-toggler"));
    const navbarToggler = document.querySelector(".custom-toggler");
    navbarToggler.classList.toggle("open");
    console.log(document.querySelector(".custom-toggler"));
  };
  return (
    <>
      <Navbar
        className="mainNav fixed-top mb-5"
        collapseOnSelect
        expand="lg"
        bg="default"
      >
        <Container>
          <Navbar.Toggle
            className="custom-toggler"
            aria-controls="responsive-navbar-nav"
            data-bs-toggle="collapse"
            data-bs-target="#responsive-navbar-nav"
            onClick={navToggleX}
          >
            {" "}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <img src={logo} style={{ width: "100px" }} />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Nav className="first-nav nav-list display-flex flex-grow-1 gap-4">
                <Nav.Link className="nav-link1" as={Link} to="/">
                  Home{" "}
                </Nav.Link>
                <Nav.Link className="nav-link1" as={Link} to="/">
                  All Events{" "}
                </Nav.Link>
                {/* <NavDepartament className="nav-link1" /> */}
                <Nav.Link className="nav-link1" as={Link}>
                  News
                </Nav.Link>
                <Nav.Link className="nav-link1" as={Link}>
                  Contacts
                </Nav.Link>
              </Nav>
              <Nav className="align-items-center">
                <Nav.Link as={Link} to="/login">
                  <Button
                    className="top-link-button top-login-button"
                    variant="light"
                    size="sm"
                  >
                    Login
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button
                    className="top-link-button top-signup-button"
                    variant="light"
                    size="sm"
                  >
                    Sign up
                  </Button>
                </Nav.Link>
                <NavbarProfile className="nav-link" />
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DemoNavbar;
