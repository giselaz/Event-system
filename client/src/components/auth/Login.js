import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { isEmail } from "validator";
import { useForm } from "react-hook-form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import Error from "../Error";
import Success from "../Success";
import { Navigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const checkBtn = useRef();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onChangeEmail = (e) => {
  //   const email = e.target.value;
  //   setEmail(email);
  // };

  // const onChangePassword = (e) => {
  //   const password = e.target.value;
  //   setPassword(password);
  // };

  async function onSubmit(data) {
    setData(JSON.stringify(data));

    try {
      const result = (await axios.post("/auth/login", data)).data;

      localStorage.setItem("currentUser", JSON.stringify(result.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(result.refreshToken)
      );
      localStorage.setItem("userData", JSON.stringify(result.user));
      setSuccess("Logimi u krye me sukses");
      if (result.user.role === "admin") {
        navigate("/admin");
      } else if (result.user.role === "user") {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
    // setLoading(false);
  }

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   setMessage("");
  //   setLoading(true);

  //   if (checkBtn.current.context._errors.length === 0) {
  //     AuthService.login(email, password).then(
  //       () => {
  //         navigate("/profile");
  //         window.location.reload();
  //       },
  //       (error) => {
  //         const resMessage =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();

  //         setLoading(false);
  //         setMessage(resMessage);
  //       }
  //     );
  //   } else {
  //     setLoading(false);
  //   }
  // };

  return (
    <section className="section section-shaped ">
      <div className="shape  bg-light"></div>
      <Container
        className="pt-lg-7 d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Card
          className="bg-secondary shadow border-0"
          style={{ height: "20em" }}
        >
          {error.length > 0 && <Error msg={error}></Error>}
          {success.length > 0 && <Success msg={success}></Success>}
          <Card.Title className="bg-white pt-4">
            <div className="text-muted text-center  ">
              <h4>Login</h4>
            </div>
          </Card.Title>
          <Card.Body className="px-lg-5 py-lg-5">
            <div className="bs">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
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
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

                <button className="btn btn-primary mt-3">Login</button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Login;
