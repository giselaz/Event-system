import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { AnimationOnScroll } from "react-animation-on-scroll";
import CountUp from "react-countup";
import "animate.css";
const Stats = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.unobserve(containerRef.current);
    };
  }, []);
  return (
    <AnimationOnScroll animateIn="animate__animated animate__fadeInUp">
      <Container className="stats-main" ref={containerRef}>
        <div className="stats-sub">
          <CountUp end={20} duration={2} delay={0.5} start={inView ? null : 0}>
            {({ countUpRef }) => (
              <span className="quantity" ref={countUpRef}></span>
            )}
          </CountUp>
          <span className="stat-element">Universities</span>
        </div>
        <div className="stats-sub">
          <CountUp end={300} duration={2} delay={0.5} start={inView ? null : 0}>
            {({ countUpRef }) => <span className="quantity" ref={countUpRef} />}
          </CountUp>
          <span className="stat-element">Students</span>
        </div>
        <div className="stats-sub">
          <CountUp end={100} duration={2} delay={0.5} start={inView ? null : 0}>
            {({ countUpRef }) => <span className="quantity" ref={countUpRef} />}
          </CountUp>
          <span className="stat-element">Bookings</span>
        </div>
      </Container>
    </AnimationOnScroll>
  );
};

export default Stats;
