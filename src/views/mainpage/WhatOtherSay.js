import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import review from "../../images/left-imgs/img-4.jpg";
import "./whatothersay.module.css";
// What Other Say component for index page
function WhatOtherSay() {
  //for responsive carousel for diffrent width
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 3 },
  };
  return (
    <>
      <div className="section3125 mt-30">
        <h4 className="item_title">What Others Say</h4>

        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableDotsControls={true}
          classNameName="reviews"
        >
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="fcrse_4 mb-20">
              <div className="say_content">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos eros ac, sagittis
                  orci."
                </p>
              </div>
              <div className="st_group">
                <div className="stud_img">
                  <img src={review} alt="" />
                </div>
                <h4>John Doe</h4>
              </div>
            </div>
          </div>
        </AliceCarousel>
      </div>
    </>
  );
}

export default WhatOtherSay;
