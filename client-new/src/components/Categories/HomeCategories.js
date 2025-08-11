import { useState, useEffect, useRef } from "react";
import { getAllCategories } from "../../Services/categoryService";
import classes from "./Categories.module.css";
import CarouselCard from "../Layout/Card/CarouselCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const HomeCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={classes.homeCategoryContainer}>
      <p className={classes.categoryHeader}>Category</p>
      <p className={classes.categoryBrowse}>Browse by Category</p>
      <button className={`${classes.arrowBtn} ${classes.left}`} ref={prevRef}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className={classes.carousel}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <CarouselCard name={category.name} image={category.image} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`${classes.arrowBtn} ${classes.right}`} ref={nextRef}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default HomeCategories;
