import React from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const SimpleFooter = () => {
  return (
    <>
      <footer className=" footer" style={{ height: "4rem" }}>
        <Container>
          <Row className=" row-grid align-items-center mb-5">
            <Col lg="6">
              <h6 className=" text-primary font-weight-light mb-2">
                Sheshi Nënë Tereza 4, Tiranë
              </h6>
            </Col>
            <Col lg="4">
              <h6 className=" text-primary font-weight-light mb-2">
                Telefon: +355.42.278159
              </h6>
            </Col>
            <Col className="text-lg-center btn-wrapper" lg="6"></Col>
          </Row>
          <hr />
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © 2010-2021 Universiteti Politeknik i Tiranës (UPT)
              </div>
            </Col>
            <Col md="6">
              <Nav className=" nav-footer justify-content-end">
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com/presentation?ref=adsr-footer"
                    target="_blank"
                  >
                    Rreth Nesh
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="http://blog.creative-tim.com?ref=adsr-footer"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default SimpleFooter;
