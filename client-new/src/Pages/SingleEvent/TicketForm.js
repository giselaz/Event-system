import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "../../components/Layout/Button";
import { useState } from "react";

const TicketForm = (props) => {
  const [quantity, setQuantity] = useState(1); // Default quantity to 1

  const ticketPrice = props.price || 100; // Set a default price if not provided
  const maxSeats = props.maxParticipants || 99961; // Default seat count

  const handleQuantityChange = (operation) => {
    setQuantity((prev) =>
      operation === "increment"
        ? Math.min(prev + 1, maxSeats) // Prevent exceeding max seats
        : Math.max(prev - 1, 1) // Prevent going below 1
    );
  };

  const subtotal = ticketPrice * quantity;

  return (
    <Card style={{ width: "100%", maxWidth: "400px", margin: "20px auto" }}>
      <Card.Body>
        <h4>Tickets</h4>
        <div style={{ marginBottom: "10px" }}>
          <strong style={{ color: "#6f42c1" }}>DEFAULT</strong>{" "}
          <small>({maxSeats} seats remaining)</small>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p style={{ margin: 0 }}>Ticket Price:</p>
            <strong>${ticketPrice.toFixed(2)}</strong>
          </div>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange("decrement")}
              style={{ width: "30px", height: "30px" }}
              disabled={quantity === 1}
            >
              -
            </Button>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(Number(e.target.value), maxSeats)))}
              style={{
                width: "60px",
                textAlign: "center",
                margin: "0 10px",
              }}
              min="1"
              max={maxSeats}
            />
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange("increment")}
              style={{ width: "30px", height: "30px" }}
              disabled={quantity === maxSeats}
            >
              +
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p style={{ margin: 0 }}>Subtotal:</p>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        <Button
          variant={props.active ? "primary" : "danger"}
          disabled={!props.active}
          className="w-100 mt-3"
        >
          {props.active ? "Proceed to Checkout" : "Event has Ended"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TicketForm;
