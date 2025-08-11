import React, { useEffect, useState } from "react";
import CardImg from "react-bootstrap/esm/CardImg";
import "../../styles/home.css";
import axiosInstance from "../../services/helper";

const EventImage = (props) => {
  const eventId = props.id;
  const [image, setImage] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/events/${eventId}/images`, { responseType: "blob" })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      })
      .catch((err) => console.log(err));
  }, [eventId]);

  return (
    <CardImg src={image} style={props.style} className={props.className} />
  );
};

export default EventImage;
