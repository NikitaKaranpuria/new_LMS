import React from "react";
import achievement from "../../images/dashboard/achievement.svg";
import graduation from "../../images/dashboard/graduation-cap.svg";
import online_course from "../../images/dashboard/online-course.svg";
import knowledge from "../../images/dashboard/knowledge.svg";
import img from "../../images/courses/img-1.jpg";
import news from "../../images/courses/news-1.jpg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./instructorstyle.css";
//instructor dashboard component
function InstructorDashboard(params) {
  let history = useHistory();

  const [profile, setProfileView] = useState([]);
  const [latestCourse, setLetestCourse] = useState([]);
  const [dashboard, setDasboard] = useState([]);
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    GetInstructorDashboardList()
    ProfileView()
    LatestCourselist()
  }, []);
  const GetInstructorDashboardList = async () => {
    await axios
      .get(`${BaseUrl}forentend/instructer_dashbord`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setDasboard(response.data.data);
        // console.log(response.data, "dashboard instructor");
      });
  };
  const LatestCourselist = async () => {
    await axios
      .get(`${BaseUrl}forentend/myletestcourse`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setLetestCourse(response.data);
      });
  };

  const ProfileView = async () => {
    await axios
      .get(`${BaseUrl}forentend/instructer_profile/${localStorage.getItem("profile_id")}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setProfileView(response.data.data);
      });
  };

  return (
    <div className="sa4d25">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-apps"></i> Instructor Dashboard
            </h2>
          </div>
          {dashboard.map((cv, index) => (
            <div className="row col-md-12" key={index}>
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Sales</h5>
                    <h2>${cv.Total_Sales}</h2>
                    <span className="crdbg_1">New ${cv.NewSales}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={achievement} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Enroll</h5>
                    <h2>{cv.Total_Enroll}</h2>
                    <span className="crdbg_2">New {cv.NewEnroll}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={graduation} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Courses</h5>
                    <h2>{cv.Total_Courses}</h2>
                    <span className="crdbg_3">New {cv.NewCourses}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={online_course} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Students</h5>
                    <h2>{cv.Total_Students}</h2>
                    <span className="crdbg_4">New {cv.NewStudents}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={knowledge} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card_dash1">
                  <div className="card_dash_left1">
                    <i className="uil uil-book-alt"></i>
                    <h1>Want to create one more course?</h1>
                  </div>
                  <div className="card_dash_right1">
                    <Link to="/instructor/instructor_new_course">
                      <button className="create_btn_dash">
                        Create your course
       </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="row">
          <div className="col-xl-4 col-sm-6">
            <div className="card card-mini analysis_card">
              <div className="card-body">
                <h2 className="mb-2">850</h2>
                <p>Subscribers</p>
                <div className="chartjs-wrapper">
                  <canvas id="barChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6">
            <div className="card card-mini analysis_card">
              <div className="card-body">
                <h2 className="mb-1">1800</h2>
                <p>Weekly Visitors</p>
                <div className="chartjs-wrapper">
                  <canvas id="dual-line"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6">
            <div className="card card-mini analysis_card">
              <div className="card-body">
                <h2 className="mb-1">30</h2>
                <p>Weekly Sales</p>
                <div className="chartjs-wrapper">
                  <canvas id="line"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="section3125 mt-50">
              <h4 className="item_title">Latest Courses Performance</h4>
              <div className="la5lo1">
                <div className="owl-carousel courses_performance owl-theme">



                  {latestCourse.reverse().map((cv, i) => {

                    if (i <= 4) {
                      return <div className="item">
                        <div className="fcrse_1">
                          <a href="#" className="fcrse_img">
                            <img src={cv.thumbnail ? cv.thumbnail : img} alt="" />
                            <div className="course-overlay"></div>
                          </a>
                          <div className="fcrse_content">
                            <div className="vdtodt">
                              <span className="">{cv.created_at}</span>
                            </div>
                            {/* <a href="#" className="crsedt145">
                              {cv.title}{" "}
                            </a> */}
                            <div  className="crsedt145">
                              {cv.title}{" "}
                            </div>
                            <div className="allvperf">
                              <div className="crse-perf-left">View</div>
                              <div className="crse-perf-right">{cv.view}</div>
                            </div>
                            <div className="allvperf">
                              <div className="crse-perf-left">Purchased</div>
                              <div className="crse-perf-right">{cv.Purchased}</div>
                            </div>
                            <div className="allvperf">
                              <div className="crse-perf-left">Total Like</div>
                              <div className="crse-perf-right">{cv.c_like}</div>
                            </div>
                            {/* <div className="auth1lnkprce">
          <a href="#" className="cr1fot50">
            See comments
          </a>
          <a href="#" className="cr1fot50">
            See Reviews
          </a>
        </div> */}
                          </div>
                        </div>
                      </div>
                    }
                  })

                  }

                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="section3125 mt-50">
              <h4 className="item_title">News</h4>
              <div className="la5lo1">
                <div className="owl-carousel edututs_news owl-theme">
                  <div className="item">
                    <div className="fcrse_1">
                      <a href="#" className="fcrse_img">
                        <img src={news} alt="" />
                      </a>
                      <div className="fcrse_content">
                        <a href="#" className="crsedt145 mt-15">
                          Post Title
                        </a>
                        <p className="news_des45">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                        <div className="auth1lnkprce">
                          <a href="#" className="cr1fot50">
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fcrse_1">
                      <a href="#" className="fcrse_img">
                        <img src={news} alt="" />
                      </a>
                      <div className="fcrse_content">
                        <a href="#" className="crsedt145 mt-15">
                          Post Title
                        </a>
                        <p className="news_des45">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                        <div className="auth1lnkprce">
                          <a href="#" className="cr1fot50">
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fcrse_1">
                      <a href="#" className="fcrse_img">
                        <img src={news} alt="" />
                      </a>
                      <div className="fcrse_content">
                        <a href="#" className="crsedt145 mt-15">
                          Post Title
                        </a>
                        <p className="news_des45">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                        <div className="auth1lnkprce">
                          <a href="#" className="cr1fot50">
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="section3125 mt-50">
              <h4 className="item_title">Profile Summary</h4>
              {
                profile.map((cv, i) => {
                  return <div className="la5lo1">
                    <div className="fcrse_1">
                      <div className="fcrse_content">
                        <h6 className="crsedt8145">Current subscribers</h6>
                        <h3 className="subcribe_title">{cv.Subscribers}</h3>

                        <div className="allvperf">
                          <div className="crse-perf-left">
                            Courses<span className="per_text"></span>
                          </div>
                          <div className="crse-perf-right">{cv.Courses}</div>
                        </div>
                        <div className="allvperf">
                          <div className="crse-perf-left">
                            Enroll
                       </div>
                          <div className="crse-perf-right">{cv.Enroll_Students}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
            {/* <div className="section3125 mt-50">
              <h4 className="item_title">Submited Courses</h4>
              <div className="la5lo1">
                <div className="fcrse_1">
                  <div className="fcrse_content">
                    <div className="upcming_card">
                      <a href="#" className="crsedt145">
                        Course title!<span className="pndng_145">Pending</span>
                      </a>
                      <p className="submit-course">
                        Submitted<span>2 days ago</span>
                      </p>
                      <a href="#" className="delete_link10">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default InstructorDashboard;
