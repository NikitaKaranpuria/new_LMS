import React from "react";
import online_course from "../../images/dashboard/online-course.svg";
import knowledge from "../../images/dashboard/knowledge.svg";
import news1 from "../../images/courses/news-1.jpg";
import news2 from "../../images/courses/news-2.jpg";
import { Link } from "react-router-dom";
import "./studentstyle.css";
import DashboardFooter from "src/containers/DashnoardFooter";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
//student dashboard component
function StudentDashboard(param) {
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    GetInstructorDashboardList()
  }, []);

  const [dashboard, setDasboard] = useState([]);
  const GetInstructorDashboardList = async () => {
    await axios
      .get(`${BaseUrl}forentend/student_dashbord`, {
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

  return (
    <div className="sa4d25">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-apps"></i>Dashboard
            </h2>
          </div>
          {dashboard.map((cv, index) => (
            <div class="row col-md-12" key={index}>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Purchased Courses</h5>
                    <h2>{cv.Total_Purchased_Courses}</h2>
                    <span className="crdbg_3">New {cv.New}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={online_course} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="card_dash">
                  <div className="card_dash_left">
                    <h5>Total Instrutors Followe</h5>
                    <h2>{cv.Total_Instrutors_Followe}</h2>
                    <span className="crdbg_4">New {cv.Newsubscriber}</span>
                  </div>
                  <div className="card_dash_right">
                    <img src={knowledge} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}


        </div>


        {/* <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="section3125 mt-50">
              <h4 className="item_title">Latest News</h4>
              <div className="la5lo1">
                <div className="owl-carousel edututs_news owl-theme">
                  <div className="item">
                    <div className="fcrse_1">
                      <Link to="#" className="fcrse_img">
                        <img src={news1} alt="" />
                      </Link>
                      <div className="fcrse_content">
                        <Link to="#" className="crsedt145 mt-15">
                          COVID-19 Updates & Resources
                        </Link>
                        <p className="news_des45">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                        <div className="auth1lnkprce">
                          <Link to="#" className="cr1fot50">
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fcrse_1">
                      <Link to="#" className="fcrse_img">
                        <img src={news2} alt="" />
                      </Link>
                      <div className="fcrse_content">
                        <Link to="#" className="crsedt145 mt-15">
                          Watch: Popular isntructor of the month
                        </Link>
                        <p className="news_des45">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                        <div className="auth1lnkprce">
                          <Link to="#" className="cr1fot50">
                            Watch Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="section3125 mt-50">
              <h4 className="item_title">What's new</h4>
              <div className="la5lo1">
                <div className="fcrse_1">
                  <div className="fcrse_content">
                    <Link to="#" className="new_links10">
                      Lorium ipsum
                    </Link>
                    <Link to="#" className="new_links10">
                      Lorium ipsum
                    </Link>
                    <Link to="#" className="new_links10">
                      Lorium ipsum
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default StudentDashboard;
