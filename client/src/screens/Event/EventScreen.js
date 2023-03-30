import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import EventImage from "../../components/Homepage/EventImage";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/helper";

const EventScreen = () => {
  const token = JSON.parse(localStorage.getItem("currentUser"));
  const id = useParams().departamentId;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/departament/${id}//allEvents`, {
        headers: {
          Authorization: `${token}`,
        },
      })

      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="pt-lg-5 pb-lg-6">
      <Row>
        {events.map((event) => (
          <Col key={event._id} className="pb-lg-4">
            <Card style={{ width: "18rem" }} className="pb-lg-4">
              <Card.Body>
                <EventImage
                  style={{ width: "200px", height: "200px" }}
                  id={event._id}
                ></EventImage>
                <Card.Title>{event.name}</Card.Title>

                <Card.Text
                  style={{
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.description}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold" }}>
                  {" "}
                  Hyrja: {event.fee == 0 ? "falas" : event.fee + "ALL"}
                </Card.Text>
                <Card.Text>
                  Ne Date :
                  {new Date(event.start_date).toLocaleString("sq-AL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Card.Text>
              </Card.Body>
              <Container className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "60%" }}
                  {...(event.active === false ? "disabled" : "")}
                >
                  <Link to={`/events/${event._id}`} style={{ color: "white" }}>
                    Lexo me teper
                  </Link>
                </Button>
              </Container>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventScreen;
