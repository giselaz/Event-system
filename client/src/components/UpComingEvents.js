import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventImage from "./EventImage";
import { Button } from "reactstrap";

const UpCommingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("helloo");
    fetch("/departament/activeEvents")
      .then((response) => response.json())
      .then((response) => {
        setEvents(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <Container className="mt-5 mb-5 ">
      <h4 className="upcomming-title">Upcomming Events</h4>
      <Row>
        <Slider {...settings}>
          {events.map((event) => (
            <Col>
              <Card className="event-container">
                <EventImage id={event._id} className="event-image" />
                <Card.Body class="body-container">
                  <div className="overlay"></div>
                  <div className="event-info">
                    <p className="event-title">{event.name}</p>
                    <div className="separator"></div>
                    <p className="price">${event.fee}</p>
                    <div className="additional-info">
                      <p className="info">
                        <i className="fas fa-map-marker-alt"></i>
                        {event.location}
                      </p>
                      <p className="info">
                        <i className="far fa-calendar-alt"></i>
                        {new Date(event.start_date).toLocaleDateString(
                          "En-GB",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        ,
                        {new Date(event.start_date).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hourCycle: "h12",
                          }
                        )}
                      </p>
                      <div className="info-description">
                        <p className="info">{event.description}</p>
                      </div>
                    </div>
                    <button className="action">Book it</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default UpCommingEvents;
