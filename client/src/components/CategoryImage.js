import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import axios from "axios";
import CardImg from "react-bootstrap/esm/CardImg";
import "../styles/home.css";

const CategoryImage = (props) => {
  const categoryId = props.id;

  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`departament/${categoryId}/image`, { responseType: "blob" })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  return (
    <div
      className={props.className}
      style={{ backgroundImage: `url(${image})` }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
};

export default CategoryImage;
