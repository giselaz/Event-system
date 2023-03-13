import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavDepartament = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("/departament")
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <NavDropdown title="Departamentet" id="collasible-nav-dropdown">
      {datas.map((data) => (
        <NavDropdown.Item
          as={Link}
          to={`/departament/${data._id}/events`}
          key={data._id}
        >
          {data.emri}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default NavDepartament;
