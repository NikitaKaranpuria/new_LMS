import React from "react";
import images from "../../images/courses/img-1.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
// get search result component for search result page
function GetSearchResult() {
  let history = useHistory();

  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      localStorage.setItem("LMS_Token");
      history.push(`/sign_in`);
    }
    AllCourseList();
  }, []);

  const [course, setCourse] = useState([]);
  const [topic, setTopic] = useState([]);
  const [level, setLevel] = useState([]);
  const [language, setLanguage] = useState([]);
  const [price, setPrice] = useState([]);
  const [features, setFeatures] = useState([]);
  const [videoDuration, setVideoDuration] = useState([]);
  const [subtitle, setSubtitle] = useState([]);
  const [allCourselist, setallCourseList] = useState([]);
  const [category, setCategory] = useState([]);

  const RecieveCourse = async () => {
    await axios
      .post(`${BaseUrl}filtercourse`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setCourse(response.data);
      });
  };

  useEffect(() => {
    // RecieveCourse();
    AllCourseList();
  }, []);

  const getCourseDetail = (id) => {
    history.push(`/course_detail/${id}`);
  };

  const addToCart = (id) => {
    history.push(`/course_detail/${id}`);
  };

  const AllCourseList = async () => {
    if (localStorage.getItem("CategoryID")) {

      const categoryid = JSON.parse(localStorage.getItem("CategoryID"));
      await axios
        .get(
          `${BaseUrl}forentend/findbycategory/${categoryid.id}`,
          {
            method: "GET",
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
          setallCourseList(response.data);
        });
      localStorage.removeItem("CategoryID");
    } else {
      await axios
        .post(
          `${BaseUrl}forentend/filtercourse`,
          {
            method: "POST",
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
          setallCourseList(response.data);
        });
    }
  };

  return (
    <>
      <div class="col-md-12">
        <h4 class="mhs_title">5 Results</h4>
        {allCourselist.map((allList, index) => (
          <div class="fcrse_2" key={index}>
            <a href={`/course_detail/${allList.id}`} class="hf_img">
              {/* <img src="images/courses/img-1.jpg" alt="" /> */}
              <img src={allList.thumbnail} alt="" />

              <div class="course-overlay">
                <div class="badge_seller">Bestseller</div>
                <div class="crse_reviews">
                  <i class="uil uil-star"></i>
                  {allList.rate}
                </div>
                <span class="play_btn1">
                  <i class="uil uil-play"></i>
                </span>
                <div class="crse_timer">20 hours</div>
              </div>
            </a>
            <div class="hs_content">
              <div class="eps_dots eps_dots10 more_dropdown">
                <a href="#">
                  <i class="uil uil-ellipsis-v"></i>
                </a>
                <div class="dropdown-content">
                  {/* <span>
                    <i class="uil uil-share-alt"></i>Share
                  </span> */}
                  <span>
                    <i class="uil uil-heart"></i>Save
                  </span>
                  {/* <span>
                    <i class="uil uil-ban"></i>Not Interested
                  </span>*/}
                  <span>
                    <i class="uil uil-windsock"></i>Report
                  </span>
                </div>
              </div>
              <div class="vdtodt">
                <div class="">{allList.view} views</div>
                <div class="" style={{ marginLeft: "35px", marginTop: "-16px" }}>{allList.created_at}</div>
              </div>
              {/* <a href="course_detail_view.html" class="crse14s title900">Courset title goes here</a> */}
              <a
                href={`/course_detail/${allList.index}`}
                class="crse14s title900"
              >
                {allList.title}
              </a>

              <a href="#" class="crse-cate">
                {/* language | Subtitle */}
                {allList.language_name} | {allList.subtitles_name}
              </a>
              <div class="auth1lnkprce">
                <p class="cr1fot">
                  By <a href="#">{allList.first_name}</a>
                </p>
                <div class="prce142">${allList.price}</div>
                <button class="shrt-cart-allListbtn" title="cart">
                  <i class="uil uil-shopping-cart-alt"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* <div class="main-loader mt-50">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div> */}
      </div>
    </>
  );
}
export default GetSearchResult;
