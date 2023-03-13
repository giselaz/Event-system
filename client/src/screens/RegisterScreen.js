import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Error from "../components/Error";
import Success from "../components/Success";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const USER_REGX = /^[A-Za-z]+$/;
const PWD_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const RegisterScreen = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (name.trim() !== "" && USER_REGX.test(name)) {
      setValidName(true);
    } else setValidName(false);

    console.log(validName);
  }, [name]);

  useEffect(() => {
    if (email.trim() !== "" && EMAIL_REGX.test(email)) {
      setValidEmail(true);
    } else setValidEmail(false);
    console.log(email);
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGX.test(password));
  }, [password]);

  // useEffect(() => {
  //   setErrorMsg("");
  // }, [name, password, email, surname]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGX.test(name);
    const v2 = PWD_REGX.test(password);
    const v3 = USER_REGX.test(surname);
    const v4 = EMAIL_REGX.test(email);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrorMsg("Invalid Entry");
      return;
    }
    console.log("form submit");
    const user = {
      name,
      surname,
      email,
      password,
    };
    try {
      const response = await axios.post("/users/signup", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccessMsg("Regjistrimi u be me sukses");
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setPassword("");
      setEmail("");
      setSurname("");
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("Email already in use");
      } else {
        setErrorMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="section section-shaped section-lg">
      <div className="shape  bg-light"></div>
      <Container className="pt-lg-7">
        <Row className="justify-content-center">
          <Col lg="5">
            {errMsg.length > 0 && <Error msg={errMsg}></Error>}
            <Card className="bg-secondary shadow border-0">
              {successMsg.length > 0 && <Success msg={successMsg}></Success>}
              <Card.Title className="bg-white pt-4">
                <div className="text-muted text-center  ">
                  <h4>Regjistrimi</h4>
                </div>
              </Card.Title>
              <Card.Body className="px-lg-5 py-lg-5">
                {/* <div className="text-center text-muted mb-4">
                  <small>Or sign up with credentials</small>
                </div> */}
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroup.Text>
                        <i className="ni ni-hat-3" />
                      </InputGroup.Text>
                      <Form.Control
                        ref={userRef}
                        placeholder="Emri"
                        type="text"
                        value={name}
                        required
                        onChange={(event) => setName(event.target.value)}
                        onBlur={() => setNameFocus(false)}
                        aria-invalid={validName ? "false" : "true"}
                      />
                      {!validName && (
                        <p className="error-text">Name must not be empty.</p>
                      )}
                    </InputGroup>
                  </FormGroup>

                  {/* <FormGroup
                    className={validSurname ? "has-success" : "has-danger"}
                  >
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroup.Text>
                        <i className="ni ni-hat-3" />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Mbiemri"
                        type="text"
                        className={validSurname ? "is-valid" : "is-invalid"}
                        value={surname}
                        required
                        onChange={(event) => setSurname(event.target.value)}
                        onFocus={() => setSurnameFocus(true)}
                        onBlur={() => setSurnameFocus(false)}
                      />
                    </InputGroup>
                  </FormGroup> */}
                  <FormGroup>
                    {/* <DropdownButton
                      variant="outline-secondary"
                      title="Dega"
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item>Elektronike</Dropdown.Item>
                      <Dropdown.Item>Telekomunikacion</Dropdown.Item>
                      <Dropdown.Item>Informatike</Dropdown.Item>
                    </DropdownButton> */}
                  </FormGroup>
                  <FormGroup
                    className={validEmail ? "has-success" : "has-danger"}
                  >
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroup.Text>
                        <i className="ni ni-email-83" />
                      </InputGroup.Text>

                      <Form.Control
                        placeholder="Email"
                        type="email"
                        className={validEmail ? "is-valid" : "is-invalid"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={validPassword ? "has-success" : "has-danger"}
                  >
                    <InputGroup className="input-group-alternative">
                      <InputGroup.Text>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroup.Text>

                      <Form.Control
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        className={validPassword ? "is-valid" : "is-invalid"}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>

                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button">
                      Krijo llogari
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RegisterScreen;
