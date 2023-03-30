import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryImage from "./CategoryImage";
import Card from "react-bootstrap/Card";
import axiosInstance from "../../services/helper";
import { Link } from "react-router-dom";

const Categories = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/departament")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container className="mt-4 d-flex align-items-center flex-column">
      <div style={{ width: "50%" }}>
        <h2
          style={{
            fontFamily: "Poppins",
            textAlign: "center",
            fontSize: "28px",
            color: "#1e2022",
            padding: "20px",
          }}
        >
          Whatever you organise, we’ve got you covered
        </h2>
      </div>

      <Row className="card-grid d-flex justify-content-center">
        {datas.map((data) => (
          <Col xl={4} lg={4} md={6} className="mb-3" key={data._id}>
            <Card style={{ minHeight: "12rem" }}>
              <CategoryImage id={data._id} className="card__image" />
              <Card.Body className="card__content">
                <Card.Title
                  as={Link}
                  to={`/departament/${data._id}/events`}
                  className="card__title
                "
                >
                  {data.emri}
                </Card.Title>
                <Card.Text className="card__text">{data.pershkrimi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
