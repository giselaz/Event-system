import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Error";
import Success from "../Success";
import Register2 from "../../screens/Register2";
import "../../styles/login.css";
import { useState } from "react";
import "animate.css";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn, signInGoogle } from "../../actions/auth";

const Login = () => {
  let navigate = useNavigate();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleLogin = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

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
      dispatch(signInGoogle(accessToken, navigate));
      // dispatch(signIn());
    } catch (err) {
      console.log(err);
    }
  };
  const googleError = () => {
    console.log("Login Failed");
  };
  async function onSubmit(formData) {
    setData(JSON.stringify(formData));

    try {
      dispatch(signIn(formData, navigate));
      setSuccess("Logimi u krye me sukses");
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
    // setLoading(false);
  }

  const handleRegister = () => {
    const loginCard = document.querySelector(".login-card");
    loginCard.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      setShowRegister(true);
    }, 500);
  };

  const handleLoginUI = () => {
    setTimeout(() => {
      setShowRegister(false);
    }, 500);
  };

  return (
    <section
      className="section section-shaped login-container "
      style={{ padding: "15% 0" }}
    >
      <div className="shape  bg-light"></div>

      {showRegister ? (
        <Container
          className="pt-lg-7 d-flex flex-column align-items-center"
          style={{ height: "100vh" }}
        >
          <Register2 className="animate__animated animate__fadeInDown register__login" />
          <Link className="Login-signup-link" onClick={handleLoginUI}>
            Already have an account?
          </Link>
        </Container>
      ) : (
        <Container
          className="pt-lg-7 d-flex flex-column align-items-center"
          style={{ height: "100vh" }}
        >
          <Card
            className="shadow border-0 login-card register__login animate__animated"
            style={{ paddingTop: "15px" }}
          >
            {error.length > 0 && <Error msg={error}></Error>}
            {success.length > 0 && <Success msg={success}></Success>}
            <Card.Title className=" pt-4" style={{ color: "white" }}>
              Login
            </Card.Title>
            <Card.Body className="px-lg-5 py-lg-5">
              <div className="bs">
                <div
                  className="google-login d-flex justify-content-center"
                  style={{ marginBottom: "1rem" }}
                >
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                  />
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-5">
                      <InputGroup.Text>
                        <i className="ni ni-hat-3" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                    </InputGroup>
                  </FormGroup>

                  {errors.email && (
                    <p style={{ color: "#ed5249" }}>Write a valid email</p>
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
                    <p style={{ color: "#ed5249" }}>
                      Password should have at least 6 characters
                    </p>
                  )}

                  <button
                    className="btn btn-primary mt-5"
                    style={{
                      padding: "3% 18%",
                      backgroundColor: "#03506f",
                      border: "none",
                    }}
                  >
                    Login
                  </button>
                </Form>
              </div>
            </Card.Body>
          </Card>
          <Link onClick={handleRegister}>Create an account</Link>
        </Container>
      )}
    </section>
  );
};

export default Login;
