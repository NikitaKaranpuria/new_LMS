import React, { useRef } from "react";
import courseImage from "../../images/courses/img-2.jpg";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  CModalFooter,
  CTooltip,
  CButton,
  CModal,
  CModalBody,
} from "@coreui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import $ from 'jquery'
//Course Title component for course detail page
export default function CourseTitle() {
  let history = useHistory();
  const myvideo = useRef(null)
  const [mytime, setmytime] = useState(0)
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
  }, []);

  const [course, setCourse] = useState([]);
  const courseid = useParams();
  const [cart, SetCartData] = useState([])

  const GetCourseData = async () => {
    await axios
      .get(`${BaseUrl}forentend/onecourse/${courseid.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setCourse(response.data.data);
      });
  };
  const ADDcart = async () => {
    $("#addtocart span").toggleClass("show")
    setTimeout(function () { $("#addtocart span").removeClass("show") }, 3000);
    await axios
      .post(
        `${BaseUrl}forentend/addcart`,
        { course_id: courseid.id },
        {

          method: "POST",
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        // history.push("/shopping_cart");
        if (response.data.message !== undefined) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal show={true} centered={true} onClose={onClose}>
                  <div className="p-3" closeButton>
                    {" "}
                    <h3>{window.location.host} LMS</h3>
                  </div>
                  <hr className="hr hr-success"></hr>
                  <CModalBody>
                    <h4>{response.data.message}</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      style={{
                        backgroundColor: "rgb(155, 61, 53)",
                        color: "white",
                      }}
                      className="btn"
                      onClick={onClose}
                    >
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
        } else {
          // window.location.reload()
        }
        // window.location.reload()
        // console.log(response);
      });
  };
  const BuyAPICAll = async () => {
    await axios
      .post(
        `${BaseUrl}forentend/addcart`,
        { course_id: courseid.id },
        {
          method: "POST",
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        if (response.data.message !== undefined) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal show={true} centered={true} onClose={onClose}>
                  <div className="p-3" closeButton>
                    {" "}
                    <h3>{window.location.host} Says</h3>
                  </div>
                  <hr className="hr hr-success"></hr>
                  <CModalBody>
                    <h4>{response.data.message}</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      style={{
                        backgroundColor: "rgb(155, 61, 53)",
                        color: "white",
                      }}
                      className="btn"
                      onClick={onClose}
                    >
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
          // alert(response.data.message)
        } else {
          history.push("/shopping_cart");
        }
      });
  }
  useEffect(() => {
    GetCourseData();
    CartTotalAPICall()
  }, []);
  const playmyvideo = () => {
    if (myvideo.current.currentTime > 5) {
      myvideo.current.pause()
    }
  }
  const CartTotalAPICall = async () => {
    await axios.get(`${BaseUrl}forentend/carttotal`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetCartData(response.data.data)
    });
  }
  return (
    <>
      {
        course.map((cv, i) => {
          return <div className="_215b01">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section3125">
                    <div className="row justify-content-center">
                      <div className="col-xl-4 col-lg-5 col-md-6">
                        {/* <div className="preview_video"> */}
                        <video controls controlsList="nodownload" style={{ height: "300px", width: "100%" }} src={cv.video_url}>

                          {/* <div className="course-overlay">
                          <div className="badge_seller">Bestseller</div>
                          <span className="play_btn1">
                            <i className="uil uil-play"></i>
                          </span>
                          <span className="_215b02">Preview this course</span>
                        </div> */}
                        </video>
                        {/* </div> */}
                        <div className="_215b10">
                          <Link to="/" className="_215b11">
                            <span>
                              <i className="uil uil-heart"></i>
                            </span>
                            Save
                          </Link>
                          <Link to="#" className="_215b12">
                            <span>
                              <i className="uil uil-windsock"></i>
                            </span>
                            Report abuse
                          </Link>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-7 col-md-6">
                        <div className="_215b03">
                          <h2> {cv.title}</h2>
                          <span className="_215b04">
                            {/* Course short description goes here */}
                            {cv.short_description}
                          </span>
                        </div>
                        <div className="_215b05">
                          <div className="crse_reviews mr-2">

                            <i className="uil uil-star"></i>
                            {cv.rate}
                          </div>
                          {cv.Totalreting ? cv.Totalreting : ''}
                        </div>
                        <div className="_215b05">{cv.enrolled} </div>
                        <div className="_215b06">
                          <div className="_215b07">
                            <span>
                              <i className="uil uil-comment"></i>
                            </span>
                            {cv.language_name}
                          </div>
                          <div className="_215b08">
                            <span>
                              <i className="uil uil-closed-captioning"></i>
                            </span>
                            <span>{cv.subtitles_name}</span>
                          </div>
                        </div>
                        <div className="_215b05">
                          Last updated {cv.modified_at}
                        </div>
                        <ul className="_215b31">
                          <li>
                            <button className="btn_adcart" id="addtocart" onClick={ADDcart}>
                              <span>Course added to cart successFully!</span> Add to cart
                            </button>
                          </li>
                          <li>
                            <button className="btn_buy" onClick={BuyAPICAll}>Buy now</button>
                          </li>
                        </ul>
                        {/* <div className="_215fgt1">10-Day Money-Back Guarantee</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        })
      }

    </>
  );
}
