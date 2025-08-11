import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Error from "../components/Error";
import Success from "../components/Success";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { signUp, signUpGoogle } from "../actions/auth";

function Register2(props) {
  const [data, setData] = useState("");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/departament")
      .then((response) => response.json())
      .then((data) => setOptions(data));

    options.map((option) => {
      console.log(option.emri);
    });
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setData(JSON.stringify(data));
    try {
      const result = await axios.post("/users/signup", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(result?.data);
      console.log(result?.accessToken);
      console.log(JSON.stringify(result));
      setSuccess("Regjistrimi u krye me sukses");
    } catch (err) {
      console.log(err.response.data);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Regjistrimi deshtoi,provoni perseri me vone");
      }
    }
  };
  const googleSuccess = async (res) => {
    const accessToken = res?.credential;
    var decoded = await jwt_decode(res?.credential);
    const { given_name, family_name, email } = decoded;

    const user = {
      name: given_name,
      surname: family_name,
      email, 
    };
    try {
      dispatch(signUpGoogle(accessToken, navigate, setError));
      // dispatch({ type: "AUTH", data: { user, token } });
      // navigate("/");
    } catch (err) {}
  };
  const googleError = () => {
    console.log("Login Failed");
  };
  return (
    <Card className={props.className}>
      {error.length > 0 && <Error msg={error}></Error>}
      {success.length > 0 && <Success msg={success}></Success>}
      <Card.Title className=" pt-4">Register</Card.Title>
      <Card.Body className="px-lg-5 py-lg-5">
        <div className="bs">
          <div
            className="google-login d-flex justify-content-center"
            style={{ marginBottom: "1rem" }}
          >
            <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroup.Text>
                  <i className="ni ni-hat-3" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  // className=" is-invalid"
                  placeholder="Emri"
                  {...register("name", { required: true })}
                />
              </InputGroup>
            </FormGroup>
            {errors.name && (
              <p style={{ color: "red" }}>Name should not be empty.</p>
            )}
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroup.Text>
                  <i className="ni ni-hat-3" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Mbiemri"
                  {...register("surname", { required: true })}
                />
              </InputGroup>
            </FormGroup>
            {errors.surname && (
              <p style={{ color: "red" }}>Mbiemri nuk duhet te jete bosh</p>
            )}

            <FormGroup>
              {errors.departament && (
                <p style={{ color: "red" }}>Zgjidhni nje departament</p>
              )}
              <InputGroup className="input-group-alternative mb-3">
                <InputGroup.Text>
                  <i className="ni ni-hat-3" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    // pattern:
                    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </InputGroup>
            </FormGroup>

            {errors.email && (
              <p style={{ color: "red" }}>Vendos nje email te sakte</p>
            )}
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroup.Text>
                  <i className="ni ni-lock-circle-open" />
                </InputGroup.Text>

                <Form.Control
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  {...register("password", {
                    required: true,
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                />
              </InputGroup>
            </FormGroup>

            {errors.password && (
              <p style={{ color: "red" }}>
                Password duhet te kete te pakten 6 karaktere
              </p>
            )}

            <button
              className="btn btn-primary mt-3"
              style={{
                padding: "3% 18%",
                backgroundColor: "#03506f",
                border: "none",
              }}
            >
              Register
            </button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Register2;
