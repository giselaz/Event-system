import classes from "./Landing.module.css";
import { useEffect, useState } from "react";
import heroImg2 from "../../assets/images/hero_area_image_2.png";
import Search from "./Search/Search";
import { getAllEvents } from "../../Services/eventService";
import HomeCategories from "../Categories/HomeCategories";
const Landing = () => {
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    getAllEvents().then((data) => {
      const limitedData = data ? data.splice(0, 6) : [];
      setEvents(limitedData);
    });
  }, []);
  return (
    <>
      <div className={`${classes.posterContainer}`}>
        <Container className={`${classes.posterInnerSection} `}>
          <p className={`${classes.posterFirstText}`}>
            Find Your Next Experience
          </p>
          <p className={`${classes.posterSecondText}`}>
            Discover & Promote Upcoming Event
          </p>
        </Container>
        <Search />

        <div className={classes.speakerImg}>
          <img src={heroImg2} />
        </div>
      </div>

      <HomeCategories />
    </>
  );
};

export default Landing;
