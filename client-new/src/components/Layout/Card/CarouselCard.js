import Card from "react-bootstrap/esm/Card";
import classes from "./Card.module.css";

const CarouselCard = (props) => {
  return (
    <Card style={{ minWidth: "180px" ,height:'180px'}}>
      <Card.Body className={classes.carouselBody}>
        <div className={classes.categoryIcon}>
          <i className={props.image}></i>
        </div>
        <Card.Title className={classes.cardTitle}>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CarouselCard;
