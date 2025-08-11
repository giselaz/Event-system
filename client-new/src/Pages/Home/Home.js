import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import Search from "../../components/Layout/Search/Search";
import { getAllEvents } from "../../Services/eventService"; 
import Container from "react-bootstrap/Container";
import EventCard from "../../components/Layout/Card/Card";
import HomeCategories from "../../components/Categories/HomeCategories";
import SectionList from "../../components/Layout/SectionList/SectionList";


const Home = () => {
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
          <Search /> 
        </Container>
      </div>
      <SectionList
        styledTitle={"Upcomming Events"}
        mainTitle={"Featured Events"}
        paginatoinText={"See All Events"}
        items={events}
        lg={4}
        renderItem={(event) => (
          <EventCard
            title={event.name}
            date={event.start_date}
            eventId={event._id}
            isHorizontal={false}
          />
        )}
      />
      <HomeCategories />
      {" "}
      <SectionList
        styledTitle={"Online Events"}
        mainTitle={"Join Online Events"}
        paginatoinText={"See All Events"}
        items={events}
        lg={6}
        renderItem={(event) => (
          <EventCard
            title={event.name}
            date={event.start_date}
            eventId={event._id}
            isHorizontal={true}
          />
        )}
      />
    </>
  );
};

export default Home;
