import React from "react";
import TopcourseThubnail from "../../images/courses/img-1.jpg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//for top  course component
function Course() {
  let history = useHistory();
  const [savecourse, setSaveCourse] = useState([]);
  const [reportReason, setReportCourse] = useState([{ reason: "" }]);
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
  }, []);

  const [course, setCourse] = useState([]);
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

  const RecieveCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/listcourse`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setCourse(response.data);
        // console.log(response.data,"course data");
      });
  };

  useEffect(() => {
    RecieveCourse();
  }, []);

  const getCourseDetail = (id) => {
    history.push(`/course_detail/${id}`);
  };

  return (
    <div className="section3125 mt-50">
      <h4 className="item_title">Courses</h4>
      <Link to={"/search_results"} className="see150">
        See all
      </Link>
      <div className="_14d25">
        <div className="row">
          {course.map((cv, id) => {
            if (id <= 19) {
              return (
                <div className="col-lg-3 col-md-4">
                  <div className="fcrse_1 mt-30">
                    <a
                      className="fcrse_img"
                      onClick={() => getCourseDetail(cv.id)}
                    >
                      <img
                        src={cv.thumbnail}
                        alt=""
                        height="150px"
                        width="100px"
                      />
                      <div className="course-overlay">
                        <div className="badge_seller">Bestseller</div>
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
                      <a
                        className="fcrse_img"
                        onClick={() => getCourseDetail(cv.id)}
                      >
                        <div className="vdtodt">
                          <div className="">{cv.view} views</div>
                          <div className=""style={{ marginLeft: "55px", marginTop: "-17px" }}>{cv.dayago}</div>
                          <div className="eps_dots more_dropdown">
                            <a>
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
                        <a className="crse14s">{cv.title}</a>
                        {/* <a href="#" className="crse-cate">
                          Language | Subtitle
                        </a> */}
                        <div className="auth1lnkprce">
                          <p className="cr1fot">
                            By{" "}
                            <Link
                              to={`/instructor/instructor_profile_view/${cv.id_user}`}
                            >
                              {cv.first_name}
                              {cv.last_name}
                            </Link>
                          </p>
                          <div className="prce142">${cv.price}</div>
                          {/* <button className="shrt-cart-btn" title="cart">
                            <i className="uil uil-shopping-cart-alt"></i>
                          </button> */}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Course;
