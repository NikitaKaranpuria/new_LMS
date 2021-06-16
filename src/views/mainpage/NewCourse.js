import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import newcoursethubnail from "../../images/courses/img-20.jpg";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
//new course component for index page
function NewCourse() {
  let history = useHistory();
  const [savecourse, setSaveCourse] = useState([]);
  const [reportReason, setReportCourse] = useState([{ reason: "" }]);
  const [course, setCourse] = useState([]);
  const GetCourseData = async () => {
    await axios
      .get(`${BaseUrl}forentend/letestcourse`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        // console.log(response.data, "latest course list");
        setCourse(response.data.data);
      });
  };
  const getCourseDetail = (id) => {
    // console.log(id, "id")
    history.push(`/course_detail/${id}`);
  };
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      // localStorage.setItem(
      //   "LMS_Token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNX0sImlhdCI6MTYxNTU0ODYzNn0.LQQN1nw5rAS-SpWIv9h5kinLdlb0f849g0yDFIweKtE"
      // );
      history.push(`/sign_in`);
    }
    GetCourseData();
  }, []);
  //#region save ,report course
  const SaveCourse = async (ID) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("course_id", ID);
    await axios
      .post(`${BaseUrl}foretend/savecourse`, urlencoded, {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          // "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setSaveCourse(response.data.data);
      });
  };

  const ReportCourse = async (ID) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("course_id", ID);
    urlencoded.append("reason", "");

    await axios
      .post(`${BaseUrl}foretend/reportcourse`, urlencoded, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setReportCourse(response.data.data);
      });
  };
  //#endregion

  //for responsive carousel for diffrent width
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 2 },
  };
  const ADDcart = async (id) => {
    await axios
      .post(
        `${BaseUrl}forentend/addcart`,
        { course_id: id },
        {
          method: "POST",
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        history.push("/shopping_cart");
        window.location.reload();
      });
  };
  return (
    <>
      <div className="section3125 mt-30">
        <h4 className="item_title">Newest Courses</h4>
        <Link
          to={"/search_results"}
          className="see150"
          style={{
            position: "relative",
            zIndex: "1",
          }}
        >
          See all
        </Link>
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableDotsControls={true}
          classNameName="newcourse"
        >
          {course.map((cv, id) => {
            // { console.log(cv, "map") }
            return (
              <div className="item">
                <div className="fcrse_1 mb-20">
                  <a
                    className="fcrse_img"
                    onClick={() => getCourseDetail(cv.id)}
                  >
                    <img
                      src={cv.thumbnail}
                      alt=""
                      style={{
                        height: "277px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="course-overlay">
                      <div className="crse_reviews">
                        <i className="uil uil-star"></i>
                        {cv.rate}
                      </div>
                      <span className="play_btn1">
                        <i className="uil uil-play"></i>
                      </span>
                      <div className="crse_timer">{cv.duration}</div>
                    </div>
                  </a>
                  <div className="fcrse_content">
                    <a className="fcrse_img">
                      <div className="vdtodt">
                        <div className="">{cv.view} Views</div>
                        <div
                          className=""
                          style={{ marginLeft: "55px", marginTop: "-16px" }}
                        >
                          {cv.created_at}
                        </div>
                        <div className="eps_dots more_dropdown">
                          <a href="">
                            <i className="uil uil-ellipsis-v"></i>
                          </a>
                          <div className="dropdown-content">
                            {/* <span>
                            <i className="uil uil-share-alt"></i>Share
                          </span> */}
                            <span>
                              <i
                                class="uil uil-heart"
                                onClick={() => SaveCourse(cv.id)}
                              ></i>
                              Save
                            </span>
                            {/* <span>
                            <i class="uil uil-ban"></i>Not Interested
                          </span> */}
                            <span>
                              <i
                                class="uil uil-windsock"
                                onClick={() => ReportCourse(cv.id)}
                              ></i>
                              Report
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={`course_detail/${cv.id}`} className="crse14s">
                        {cv.title}
                      </Link>
                      {/* <a href={"/"} className="crse-cate">
                        Language | Subtitle
                      </a> */}
                      <div className="auth1lnkprce">
                        <p className="cr1fot">
                          By{" "}
                          <Link
                            to={`/instructor/instructor_profile_view/${cv.istructer_id}`}
                          >
                            {cv.first_name}
                            {cv.last_name}
                          </Link>
                        </p>
                        <div className="prce142">${cv.price}</div>
                        <button
                          className="shrt-cart-btn"
                          title="cart"
                          onClick={() => {
                            ADDcart(cv.id);
                          }}
                        >
                          <i className="uil uil-shopping-cart-alt"></i>
                        </button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </AliceCarousel>
      </div>
    </>
  );
}

export default NewCourse;
