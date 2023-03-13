import React from "react";
import Alert from "react-bootstrap/Alert";

const Error = ({ msg }) => {
  return (
    <Alert key="danger" variant="danger">
      Dicka shkoi gabim,ju lutem provoni perseri.{msg}
    </Alert>
  );
};

export default Error;
