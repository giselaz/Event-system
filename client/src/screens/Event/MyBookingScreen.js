import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import axiosInstance from "../../services/helper";

function MyBookingScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    axiosInstance
      .get("/users/profile/getAllBookings", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => response.json())
      .then(
        (data) => setBookings(data),
        bookings.map((booking) => console.log(booking))
      );
  }, []);

  //   async function cancelBooking(bookingid, roomid) {
  //     setError("");
  //     setLoading(true);
  //     try {
  //       const data = (
  //         await axios.post("/api/bookings/cancelbooking", {
  //           bookingid,
  //           roomid,
  //         })
  //       ).data;
  //       setLoading(false);
  //       Swal.fire(
  //         "Congratulations",
  //         "Your Room Cancelled Successfully",
  //         "success"
  //       ).then((result) => {
  //         fetchMyAPI();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       //setError(error);
  //       Swal.fire("Opps", "Error:" + error, "error");
  //     }
  //     setLoading(false);
  //   }

  return (
    <div>
      {error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <Container className="Card-container">
          <Row>
            {bookings.map((booking) => (
              <Col>
                <Card
                  key={booking._id}
                  text="dark"
                  style={{ width: "30rem", height: "6rem" }}
                  className="mt-5 department-card d-flex align-items-center"
                  border="primary"
                >
                  <Card.Title>{booking.event.name}</Card.Title>
                  <Card.Body>
                    <p>{booking.date}</p>
                    <Image src={booking.event.image} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default MyBookingScreen;
