import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Error from "../../components/Error";
import Success from "../../components/Success";
import { useForm, Controller } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";

const AddEventScreen = () => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [date, setDate] = useState(new Date());

  const userToken = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (event) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(event)) {
      if (key === "demo_image") {
        formData.append("demo_image", value[0]);
      } else {
        formData.append(key, value);
      }
    }

    try {
      const result = await axios.post("departament/addEvent", formData, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result?.data);
      setSuccess("Eventi u krijua me sukses");
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setError(err);
    }
  };

  useEffect(() => {
    fetch("/departament")
      .then((response) => response.json())
      .then((data) => setOptions(data));
  }, []);

  return (
    <section className="section section-shaped ">
      <div className="shape  bg-light"></div>
      <Container className="pt-lg-7">
        {error.length > 0 ? <Error msg={error}></Error> : ""}
        {success.length > 0 ? <Success msg={success} /> : ""}
        <Row>
          <Col lg="12" className="d-flex justify-content-center">
            <Card style={{ width: "30rem" }}>
              <Card.Title className="bg-white pt-4">
                <div className="text-muted text-center  ">
                  <h4>Shto Event</h4>
                </div>
              </Card.Title>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column"
                >
                  <Form.Control
                    type="text"
                    className=" form-control "
                    {...register("name", { required: true })}
                    placeholder="titulli"
                  />

                  <Form.Control
                    type="text"
                    className=" form-control mt-3 "
                    {...register("description", { required: true })}
                    placeholder="pershkrimi"
                  />
                  <Form.Label className="mt-3">
                    Zgjidhni cmimin:
                    <Form.Control
                      type="number"
                      min="0"
                      className=" form-control  "
                      {...register("fee", { required: true })}
                    />
                  </Form.Label>
                  <Form.Group>
                    <Form.Label>
                      Zgjidhni llojin e eventit:
                      <Radio.Group
                        {...register("event_type", { required: true })}
                        className="ml-3"
                      >
                        <Radio.Button value="live">Live</Radio.Button>
                        <Radio.Button value="online">Online</Radio.Button>
                      </Radio.Group>
                    </Form.Label>
                  </Form.Group>

                  <Form.Control
                    type="text"
                    className=" form-control mt-3"
                    {...register("event_link")}
                    placeholder="linku i eventit"
                  />

                  <Form.Select
                    className="form-select mt-3"
                    {...register("department", { required: true })}
                  >
                    <option></option>
                    {options.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.emri}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Control
                    type="file"
                    name="demo_image"
                    {...register("demo_image", { required: true })}
                    className=" form-control mt-3"
                    style={{ marginBottom: "15px", marginTop: "10px" }}
                  />
                  <Form.Label>Zgjidhni daten e fillimit:</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    {...register("start_date")}
                  />

                  <Form.Label>Zgjidhni daten e perfundimit:</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    {...register("end_date")}
                  />

                  <button className="btn btn-primary mt-3" type="submit">
                    Shto Event
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddEventScreen;
