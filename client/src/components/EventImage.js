import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import axios from "axios";
import CardImg from "react-bootstrap/esm/CardImg";
import "../styles/home.css";
const EventImage = (props) => {
  const eventId = props.id;
  console.log(eventId);
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`/events/${eventId}/images`, { responseType: "blob" })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
        console.log(image);
      })
      .catch((err) => console.log(err));
  }, [eventId]);

  return <CardImg src={image} style={props.style} />;
};

export default EventImage;
