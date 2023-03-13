import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Departament = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("/departament")
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container className="Card-container">
      <Row>
        {datas.map((data) => (
          <Col key={data._id}>
            <Card
              text="dark"
              style={{ width: "30rem", height: "6rem" }}
              className="mt-5 department-card d-flex align-items-center"
              border="primary"
            >
              <Card.Title>
                <Link to={`/departament/${data._id}/events`}>{data.emri}</Link>
              </Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Departament;
