import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import EventImage from "../components/EventImage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/esm/Form";
import { Input } from "reactstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Error from "../components/Error";

const SingleEventScreen = () => {
  const id = useParams().eventId;
  const userToken = JSON.parse(localStorage.getItem("currentUser"));
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/departament/details/${id}`, {
      headers: {
        Authorization: `${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setEvent(response);
      });
  }, [id]);

  const onToken = async (token) => {
    await setEvent(event);

    const BookingDetail = {
      id,
      quantity,
      token,
    };
    try {
      const result = await axios.post("/bookings/bookEvent", BookingDetail, {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      Swal.fire("Urime", " Eventi u rezervua me sukses", "success").then(
        (result) => {
          window.location.href = "/";
        }
      );
    } catch (error) {
      if (error.response && error.response.data) {
        // error message returned by server
        Swal.fire("", error.response.data.message, "error");
      } else {
        // generic error message
        Swal.fire("", "Booking failed, please try again later", "error");
      }
    }
  };

  const freeBooking = async () => {
    const bookingDetail = {
      id: id,
    };
    try {
      const result = await axios.post("/bookings/onlineEvent", bookingDetail, {
        headers: {
          Authorization: `${userToken}`,
        },
      });

      Swal.fire("Urime pjesemarrja juaj u ruajt me sukses", "success").then(
        (result) => {
          window.location.href = "/";
        }
      );
    } catch (error) {
      // something else went wrong
      if (error.response && error.response.data) {
        // error message returned by server
        Swal.fire("", error.response.data.message);
      } else {
        // generic error message
        Swal.fire("", "Booking failed, please try again later");
      }
    }
  };

  return (
    <Card>
      <Container className="pt-lg-5 pb-lg-6">
        {error.length > 0 ? <Error msg={error}></Error> : " "}
        <Row>
          <Col md={6} lg={7}>
            <Card.Title>{event.name}</Card.Title>
            <EventImage style={{ maxHeight: "70%" }} id={id}></EventImage>
            <Card.Text>{event.description}</Card.Text>
          </Col>

          <Col
            lg={5}
            className="d-flex flex-column align-items-center justify-content-start"
          >
            <Card.Title>Detajet e eventit </Card.Title>

            <Card.Text>
              <b>Nga data :</b>
              {new Date(event.start_date).toLocaleDateString("sq-AL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              <br></br>
            </Card.Text>
            <Card.Text>
              <b>Ne orarin :</b>
              {new Date(event.start_date).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hourCycle: "h23",
              })}
              <b> - </b>
              {new Date(event.end_date).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
              })}
            </Card.Text>

            <Card.Text>
              <b>Hyrja: </b>
              {event.fee == 0 ? "falas" : event.fee + " ALL"}
            </Card.Text>

            <Form.Label style={event.fee !== 0 ? {} : { display: "none" }}>
              Nr. i rezervimeve:
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
                style={{ maxWidth: "50%" }}
              />
            </Form.Label>

            {event.fee == 0 ? (
              <Button
                variant={event.active === false ? "danger" : "primary"}
                disabled={event.active === false}
                onClick={freeBooking}
              >
                {event.active === false
                  ? "Eventi ka mbaruar"
                  : "Konfirmo pjesemarrjen"}
              </Button>
            ) : (
              <StripeCheckout
                currency="USD"
                token={onToken}
                stripeKey="pk_test_51LaIrHL4LctRSxODVsPwyai1eV9Zzrixcjm6kjtXpxEdRlaZvzonb9AB8iEqAdWhYLW1vUs9SsDbjGeHysJONN4B00BCENiL6T"
              >
                <Button className="btn btn-primary">Pay Now</Button>
              </StripeCheckout>
            )}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default SingleEventScreen;
