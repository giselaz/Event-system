import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardImg from "react-bootstrap/esm/CardImg";
import man from "../assets/img/brand/man.png";
import man1 from "../assets/img/brand/man1.png";
import woman from "../assets/img/brand/woman.png";
import woman1 from "../assets/img/brand/woman1.png";
const data = [
  {
    name: "Liam",
    job: "Student",
    image: man,
    review:
      "I've attended several events through this app and have always had a great experience. The app is easy to use and the events are well-organized and engaging",
  },
  {
    name: "Claire",
    job: "Professor",
    image: woman,
    review:
      "As an event organizer, I've found this app to be a valuable tool for promoting my events and managing registrations. The app's features have helped me streamline the planning process and reach a wider audience",
  },
  {
    name: "Joanh",
    job: "Student",
    image: woman1,
    review:
      "I love how easy it is to find and register for events using this app. It's helped me discover new interests and connect with other students who share my passions.",
  },
  {
    name: "Jason",
    job: " Graduate Student",
    image: man1,
    review:
      "The events offered through this app have been some of the most memorable experiences of my college career. From cultural festivals to professional development workshops, there's always something exciting going on.",
  },
];
const Reviews = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="reviews">
      <Container className="inner-reviews">
        <h2 className="review-title">What our users have to say</h2>
        <div class="icons8-quote-left d-flex">
          <img
            src="https://img.icons8.com/doodle/48/null/quote-left.png"
            height="58px"
          />
        </div>
        <Row className="mt-3">
          <Slider {...settings}>
            {data.map((review) => (
              <Col lg={4}>
                <Card
                  className="review-cards"
                  style={{ width: "20rem", height: "100%" }}
                >
                  <div className=" review-img d-flex justify-content-center">
                    <CardImg
                      src={review.image}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>

                  <Card.Body>
                    <Card.Text className="card-review">
                      {review.review}
                    </Card.Text>
                    <Card.Text className="card-job">
                      {review.name}-{review.job}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Slider>
        </Row>
      </Container>
    </div>
  );
};

export default Reviews;
