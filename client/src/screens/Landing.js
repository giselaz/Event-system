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
      <Container
        className="home-container d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `${image}`,
          backgroundSize: "contain",
          height: 600,
          width: 1000,
          backgroundPositionX: 267,
          paddingRight: 200,
        }}
      >
        {/* <Image
        src={require("../assets/img/brand/6101073.jpg")}
        width="100%"
        height="auto"
        fluid
      /> */}
        <Container className="landing-text">
          <h1>Behu pjese e platformes</h1>
          <h5>Informohu ne kohe reale mbi eventet ne Universitet</h5>
          <Button color="primary" size="lg" type="button">
            <Link to="/register"> Regjistrohu</Link>
          </Button>
        </Container>
      </Container>
      <Departament />
    </>
  );
};

export default Landing;
