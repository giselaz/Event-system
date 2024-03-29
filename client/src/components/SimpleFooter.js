import React from "react";
import "../styles/home.css";
import logo from "../assets/img/brand/uniLogo22.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { Button } from "reactstrap";
const SimpleFooter = () => {
  return (
    <footer class="footer">
      <Container class="container">
        <Row class="row">
          <Col className="footer-col">
            <h4>UniEvent</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
            </ul>
          </Col>
          <Col className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </Col>

          <Col className="footer-col">
            <h4>follow us</h4>
            <Form className="newsletter">
              <FormLabel>Sign up to our newsletter</FormLabel>
              <Form.Control
                type="text"
                className="newsletter-input"
              ></Form.Control>
              <Button type="submit" className="newsletter-button">
                Signup
              </Button>
            </Form>
            <div class="social-links">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default SimpleFooter;
