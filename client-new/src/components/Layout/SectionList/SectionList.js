import classes from "./Section.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "../Button";

const SectionList = ({
  styledTitle,
  mainTitle,
  paginatoinText,
  items,
  renderItem,
  lg
}) => {
  return (
    <div className={classes.eventsContainer}>
      <div className={`${classes.eventsTitle}`}>
        <h1>{styledTitle}</h1>
        <h2>{mainTitle}</h2>
      </div>
      <Container>
        <Row style={{ alignItems: "stretch" }}>
          {items.map((item,index) => (
            <Col key={index} xs={12} md={6} lg={lg} className="mb-4">
              {" "}
              {/* Ensure unique key for each child */}
              {renderItem(item)}
            </Col>
          ))}
        </Row>
      </Container>
      <div className={classes.paginationButton}>
        <Button>
          {paginatoinText} <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default SectionList;
