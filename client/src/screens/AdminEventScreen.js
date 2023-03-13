import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const AdminEventScreen = () => {
  const [events, setEvents] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch("/users/profile/events", {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setEvents(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulli</th>
            <th>Pershkrimi</th>
            <th>Departamenti</th>
            <th>Aktive</th>
            <th>Lloji eventit</th>
            <th>Data e fillimit</th>
            <th>Orari:</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr>
              <td>{event.name}</td>
              <td style={{ width: "19%" }}>
                <p style={{ wordBreak: "break-word" }}>{event.description}</p>
              </td>
              <td>{event.department.emri}</td>
              <td>{event.active === true ? "PO" : "JO"}</td>
              <td>{event.event_type}</td>
              <td>
                {" "}
                {new Date(event.start_date).toLocaleString("sq-AL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>
                {" "}
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
              </td>
              <td>
                <Link to={`/participants/${event._id}`}>Shiko Pjesemarres</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminEventScreen;
