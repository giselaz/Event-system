import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/home.css";
import axiosInstance from "../../services/helper";

const CategoryImage = (props) => {
  const categoryId = props.id;

  const [image, setImage] = useState("");

  useEffect(() => {
    axiosInstance
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
