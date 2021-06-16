import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import thumbnail from "../../images/left-imgs/img-1.jpg";
import "./slider.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { Link } from "react-router-dom";

//Popular Experts component for index page
const PopularExperts = () => {
  //for responsive carousel for diffrent width
  const responsive = {
    0: { items: 2 },
    568: { items: 4 },
    1024: { items: 5 },
  };
  const [popularList, setPopularList] = useState([]);
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      //localStorage.setItem(
      //   "LMS_Token",
      // );
      history.push(`/sign_in`);
    }
    PopularExpertList();
  }, []);

  const PopularExpertList = async () => {
    console.log("popular list");
    await axios
      .get(
        `${BaseUrl}forentend/instructor`,
        {
          // method: "GET",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        // console.log(response, "list of popular experts dashboard")
        setPopularList(response.data);
      });
  };

  return (
    <>
      <div className="d-flex justifyName-content-between">
        <h4 className="item_title mb-3">Popular Experts</h4>
        {/* <a href="search_result.html" class="see150">
          See all
        </a> */}
      </div>

      <AliceCarousel
        mouseTracking
        responsive={responsive}
        disableDotsControls={true}
        className="popular"
      >
        {popularList.map((tempopular, index) => (
          <div className="item" key={index}>
            <div className="stream_1">
            <Link
                  to={`/profile_view/${tempopular.id}`}
                class="stream_bg"
              >
                <img src={tempopular.image ? tempopular.image : null} alt="" />
                <h4>
                  {tempopular.first_name}
                  {tempopular.last_name}
                </h4>
                <Link
                  to={`/profile_view/${tempopular.id}`}
                >
                  <p>view</p>
                </Link>
                </Link>
            </div>
          </div>
        ))}
      </AliceCarousel>
    </>
  );
};
export default PopularExperts;
