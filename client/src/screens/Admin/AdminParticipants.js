import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const AdminParticipantScreen = () => {
  const eventId = useParams().eventId;
  const [participants, setParticipants] = useState([]);
  const userToken = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    try {
      const result = fetch(`/departament/${eventId}/participants`, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setParticipants(response);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDelete = (index) => {
    const newData = [...participants];
    try {
      const result = axios
        .delete(`/bookings/${eventId}`, {
          headers: {
            Authorization: `${userToken}`,
          },
        })
        .then((response) => {
          Swal.fire("", response.data.message);
          newData.splice(index, 1);
          setParticipants(newData);
        });
    } catch (err) {
      Swal.fire("", err.response.data.message);
    }
  };

  return (
    <Container className="mt-5 mb-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Email</th>
            <th>Departament</th>
            <th>Fshi</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={participant._id}>
              <td>{participant.user.name}</td>
              <td>{participant.user.surname}</td>
              <td>{participant.user.email}</td>
              <td>{participant.user.departament}</td>
              <td>
                <Button
                  variant="light"
                  className="d-flex align-items-center"
                  onClick={() => handleDelete(index)}
                >
                  <i
                    className="ni ni-fat-delete"
                    style={{ fontSize: "25px", color: "#f5365c" }}
                  ></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminParticipantScreen;
