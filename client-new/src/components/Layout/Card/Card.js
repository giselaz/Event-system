// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { getEventImage } from "../../../Services/eventService";
import { useEffect, useState } from "react";
import classes from "./Card.module.css";
import Button from "../Button";
function EventCard(props) {
  const [image, setImage] = useState();

  useEffect(() => {
    let isMounted = true; // flag to prevent setting state after unmount

    getEventImage(props.eventId) // assuming `eventId` is the correct identifier
      .then((data) => {
        if (isMounted) setImage(data); // only set image if component is mounted
      })
      .catch((error) => {
        console.error("Error fetching image:", error); // handle error
      });
  }, []);
  const eventData = { ...props, image };
  return (
    <Link to={`events/${props.eventId}`}    state={{ eventData }}>
      <Card
        className={
          `${props.isHorizontal ? classes.horizontalCard : classes.eventCard} ${classes.cardAnimation}`
        }
      >
        <Card.Img variant="top" src={image} className={classes.eventImage} />
        <Card.Body className={classes.cardBody}>
          <Card.Title className={classes.cardTitle}>{props.title}</Card.Title>
          <div className={classes.cardDate}>
          <i className="bi bi-calendar"/>
            <Card.Text>
              {new Date(props.date).toLocaleString("sq-AL", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Card.Text>
          </div>
          <div className={classes.cardFooter}>
            <p>
              Organized By <br />
              <span className={classes.eventVendor}> Set your vendor</span>
            </p>

            <Button
              to={`events/${props.eventId}`}
              state={{ eventData }}
              className={classes.generalLink}
            >
              Learn More
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default EventCard;
