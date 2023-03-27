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
    <Row className="d-flex justify-content-center gap-4">
      {datas.map((data) => (
        <Col key={data._id}>
          <Card
            text="dark"
            style={{ width: "15rem", height: "15rem" }}
            className="mt-5 department-card d-flex align-items-center"
          >
            <Card.Title>
              <Link to={`/departament/${data._id}/events`}>{data.emri}</Link>
            </Card.Title>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Departament;
