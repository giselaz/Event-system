import React from "react";
import Alert from "react-bootstrap/Alert";

const Success = ({ msg }) => {
  return <Alert variant="success">{msg}</Alert>;
};

export default Success;
