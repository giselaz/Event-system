import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import image from "../assets/img/brand/6101073.jpg";
import "../assets/img/brand/6101073.jpg";
import "../styles/home.css";
import "../assets/vendor/nucleo/css/nucleo.css";

import Departament from "../components/Department";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Container className=" landing-parent d-flex align-items-center">
        <Container className="landing-text d-flex flex-column">
          <h1 style={{ lineHeight: "1" }}>Behu pjese e platformes</h1>
          <h5>Informohu ne kohe reale mbi eventet ne Universitet</h5>
          <Button color="primary" size="lg" type="button">
            <Link to="/register" className="register-link">
              {" "}
              Regjistrohu
            </Link>
          </Button>
        </Container>
        <Container className="home-container d-flex justify-content-center align-items-center"></Container>
      </Container>
      <Container className="departament-container d-flex flex-column">
        <h2>Zgjidhni departamentin</h2>
        <Departament />
      </Container>
    </>
  );
};

export default Landing;
