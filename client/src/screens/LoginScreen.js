import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const login = async () => {
    const user = {
      email,
      password,
    };
    // try{

    // }
  };

  return <h1>Hello</h1>;
};

export default LoginScreen;
