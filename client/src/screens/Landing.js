import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import "../assets/img/brand/6101073.jpg";
import "../styles/home.css";
import "../assets/vendor/nucleo/css/nucleo.css";
import Categories from "../components/Categories";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import Stats from "../components/Stats";
import Reviews from "../components/Reviews";
import UpCommingEvents from "../components/UpComingEvents";

const Landing = () => {
  return (
    <>
      <Container
        className="landing-parent d-flex align-items-center"
        style={{ marginTop: "100px" }}
      >
        <Container className="landing-text d-flex flex-column">
          <h1
            className="animate__animated animate__fadeInDown"
            style={{ lineHeight: "1" }}
          >
            Be part of the Events Platform
          </h1>
          <p>Get informed in real time for events at your Uni</p>
          <Button
            style={{ backgroundColor: "#03506F", border: "none" }}
            size="lg"
            type="button"
          >
            <Link to="/register" className="register-link">
              {" "}
              Register
            </Link>
          </Button>
        </Container>
        <Container className="home-container d-flex justify-content-center align-items-center"></Container>
      </Container>
      <Categories />
      <Stats />
      <Reviews />
      <UpCommingEvents />
      {/* <Container className="departament-container d-flex flex-column">
        <h2>Zgjidhni departamentin</h2>
        <Departament />
      </Container> */}
    </>
  );
};

export default Landing;
