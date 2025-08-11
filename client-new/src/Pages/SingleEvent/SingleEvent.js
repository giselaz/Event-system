import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import classes from "./SingleEvent.module.css";
import Card from "react-bootstrap/esm/Card";
import { getSingleEvent } from "../../Services/eventService";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import TicketForm from "./TicketForm";

const SingleEvent = () => {
  const [event, setEvent] = useState({});
  const eventId = useParams().eventId;
  const location = useLocation();
  const eventData = location.state?.eventData;
  useEffect(() => {
    getSingleEvent(eventId).then((data) => {
      setEvent(data);
    });
  }, []);
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = Math.abs(end - start);
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };
  console.log(calculateDaysDifference(eventData.startDate, eventData.endDate));
  return (
    <div className={classes.containerWrapper}>
      <Container className={classes.gridContainer}>
        <Row>
          <Col md={8}>
            <Card className={classes.eventContentWrap}>
              <div className={classes.eventImage}>
                <Card.Img src={eventData.image} />
              </div>
              <Card.Body className={classes.cardBody}>
                <h2>{eventData.title}</h2>
                <div className={classes.eventDescription}>
                  {eventData.description}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={classes.eventContentWrap}>
              <Card.Body className={classes.cardBody}>
                <p>
                  {" "}
                  <span>Date: </span>
                  {new Date(eventData.startDate).toLocaleString("sq-AL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {calculateDaysDifference(
                    eventData.startDate,
                    eventData.endDate
                  ) != 0 &&
                    -new Date(eventData.endDate).toLocaleString("sq-AL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                <p>
                  {calculateDaysDifference(
                    eventData.startDate,
                    eventData.endDate
                  ) === 0 && (
                    <p>
                      <span>Time: </span>
                      {new Date(eventData.startDate).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hourCycle: "h23",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(eventData.endDate).toLocaleTimeString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                        hourCycle: "h23",
                      })}
                    </p>
                  )}
                </p>
                <p>
                  {" "}
                  <span>Location: </span>
                  {eventData.location}
                </p>
              </Card.Body>
            </Card>
            {event.active ? (
              <TicketForm
                price={event.fee}
                active={event.active}
                maxParticipants={event.max_participants}
              />
            ) : (
              <div>Event has ended</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleEvent;
