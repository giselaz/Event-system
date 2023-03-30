import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import EventImage from "../../components/Homepage/EventImage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/esm/Form";
import { Input } from "reactstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../services/helper";
import Error from "../../components/Error";
import "../../styles/singleEvent.css";

const SingleEventScreen = () => {
  const id = useParams().eventId;
  const userToken = JSON.parse(localStorage.getItem("currentUser"));
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/departament/details/${id}`, {
        headers: {
          Authorization: `${userToken}`,
        },
      })

      .then((response) => {
        setEvent(response.data);
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
      const result = await axiosInstance.post(
        "/bookings/bookEvent",
        BookingDetail,
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
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
      const result = await axiosInstance.post(
        "/bookings/onlineEvent",
        bookingDetail,
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );

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
    <div
      className="d-flex pt-lg-7 justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <Card className="single-event-card">
        <Container className="m-0 p-0">
          {error.length > 0 ? <Error msg={error}></Error> : " "}
          <Row className="g-0 justify-content-evenly">
            <Col sm={6} lg={6} md={5} className="single-event-image p=-">
              <EventImage className="img-fluid" id={id}></EventImage>
            </Col>
            <Col sm={6} lg={6} md={7} className="single-event-details">
              <Card.Title>{event.name}</Card.Title>
              <Card.Text className="event-description">
                {event.description}
              </Card.Text>
              <Card.Text className="single-event-date">
                <i className="far fa-calendar-alt"></i>
                {new Date(event.start_date).toLocaleDateString("sq-AL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                ,{" "}
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
                <br></br>
              </Card.Text>
              <Card.Text></Card.Text>

              <Card.Text className="event-fee">
                {event.fee == 0 ? "falas" : "$" + event.fee}
              </Card.Text>
              <div className="number-of-tickets d-flex flex-column align-items-center ">
                <Form.Label style={event.fee !== 0 ? {} : { display: "none" }}>
                  Number of tickets:
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
              </div>

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
                  <Button className="btn single-pay">Pay Now</Button>
                </StripeCheckout>
              )}
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default SingleEventScreen;
