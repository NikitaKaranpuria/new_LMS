import React from "react";
import images from "../../images/left-imgs/img-1.jpg";
import "./instructorstyle.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";

import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
//instructor review for instructor all review page
//instructo profile
function Instructor_profile_view() {
  let params = useParams();
  const [profile, setProfileView] = useState([]);
  const [courselist, Setcourselist] = useState([])
  const [subscribe, setubcribe] = useState('subscribe')
  // const [subscribe, setubcribe] = useState('subscribe')
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    ProfileView();
    RecieveCourse();
    subscrbeornot()

  }, []);

  useEffect(async () => {
    subscrbeornot()
  }, [subscribe]);
  const subscrbetoinstructor = async () => {
    const Subcribedata = {
      user_id: localStorage.getItem("profile_id"),
      Instructor_id: params.id
    }
    await axios.post(`${BaseUrl}forentend/subscribe`, Subcribedata, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then((responce) => {
      setubcribe('unsubscribe')
      confirmAlert({

        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
              <hr className='hr hr-success'></hr>
              <CModalBody>
                <h4>Subscribtion done!</h4>
              </CModalBody>
              <CModalFooter>

                <CButton

                  style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                  className='btn btn-block'
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );

        }

      });

    }).catch((error) => {
    })

    ProfileView()
  }

  const unsubscrbetoinstructor = async () => {
    const Subcribedata3 = {
      user_id: localStorage.getItem("profile_id"),
      Instructor_id: params.id
    }
    await axios.post(`${BaseUrl}forentend/unsubscribe`, JSON.stringify(Subcribedata3), {
      headers: {
        "Content-Type": 'application/json',
        "auth": localStorage.getItem("LMS_Token"),
      },
    }).then((responce) => {
      setubcribe('subscribe')
      confirmAlert({

        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
              <hr className='hr hr-success'></hr>
              <CModalBody>
                <h4>Unsubscribtion done!</h4>
              </CModalBody>
              <CModalFooter>

                <CButton

                  style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                  className='btn btn-block'
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );

        }

      });

    }).catch((error) => {
    })

    ProfileView()
  }
  const subscrbeornot = async () => {
    const Subcribedata2 = {
      // user_id: params.id,
      instructer_id: params.id
    }
    await axios.post(`${BaseUrl}foretend/subsciberornot`, JSON.stringify(Subcribedata2), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": 'application/json',
        auth: localStorage.getItem("LMS_Token"),
      },
    }).then((responce) => {
      let mes = responce.data.message;
      setubcribe(mes)


    }).catch((error) => {
      // console.log('subscription erroe')
    })

    ProfileView()
  }


  // let params = useParams();
  const RecieveCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/myinstructerlist/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {


        // For displaying Data
        Setcourselist(response.data)
      });
  };

  const ProfileView = async () => {
    await axios
      .get(`${BaseUrl}forentend/instructer_profile/${params.id}`, {
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
    <>

      <div class="_216b01">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-10">
              <div class="section3125 rpt145">
                <div class="row">
                  <div class="col-lg-7">
                    <a href="#" class="_216b22">
                      <span>
                        <i class="uil uil-windsock"></i>
                      </span>
                      Report Profile
                    </a>
                    {profile.map((tempProfile, index) => (
                      <div key={index}>
                        <div class="dp_dt150">
                          <div class="img148">
                            <img src={tempProfile.profile_image} alt="" />
                          </div>
                          <div class="prfledt1">
                            <h2>{tempProfile.Name}</h2>
                            <span>Web Developer</span>
                          </div>
                        </div>
                        <ul class="_ttl120">
                          <li>
                            <div class="_ttl121">
                              <div class="_ttl122">Enroll Students</div>
                              <div class="_ttl123">
                                {tempProfile.Enroll_Students}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="_ttl121">
                              <div class="_ttl122">Courses</div>
                              <div class="_ttl123">{tempProfile.Courses}</div>
                            </div>
                          </li>
                          <li>
                            <div class="_ttl121">
                              <div class="_ttl122">Reviews</div>
                              <div class="_ttl123">4.5k</div>
                            </div>
                          </li>
                          <li>
                            <div class="_ttl121">
                              <div class="_ttl122">Subscribers</div>
                              <div class="_ttl123">
                                {tempProfile.Subscribers}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div class="col-lg-5">
                    <a href="#" class="_216b12">
                      <span>
                        <i class="uil uil-windsock"></i>
                      </span>
                      Report Profile
                    </a>
                    <div class="rgt-145">
                      {profile.map((cv, index) => (
                        <ul class="tutor_social_links">
                          <li>
                            <a href={cv.Facebook_Link} class="fb">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href={cv.Twitter_Link} class="tw">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href={cv.LinkedIn_Link} class="ln">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a href={cv.Youtube_Link} class="yu">
                              <i class="fab fa-youtube"></i>
                            </a>
                          </li>
                        </ul>

                      ))}
                    </div>
                    <ul class="_bty149">
                      <li>
                        <button class="subscribe-btn btn500" onClick={subscribe === 'subscribe' ? subscrbetoinstructor : unsubscrbetoinstructor}>
                          {subscribe}
                        </button>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTabs activeTab="account">
        <div class="_215b15">
          <CNav>
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="course_tabs">
                    <nav>
                      <div
                        class="nav nav-tabs tab_crse"
                        id="nav-tab"
                        role="tablist"
                      >

                        <CNavItem>
                          <CNavLink data-tab="account">
                            <span>About</span>
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink data-tab="notification">
                            <span>Content</span>
                          </CNavLink>
                        </CNavItem>


                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </CNav>
        </div>  
        <div class="_215b17">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="course_tab_content">
                  <div class="tab-content" id="nav-tabContent">
                    <CTabContent>
                      <CTabPane data-tab="account">


                        <div
                          class="tab-pane fade show active"
                          id="nav-about"
                          role="tabpanel"
                        >
                          <div class="_htg451 p-4">
                            <div class="_htg452">
                              <h3>About Me</h3>

                              {
                                profile.map((cv, i) => {
                                  return <p >{cv.biography ? cv.biography : ''}</p>
                                })
                              }

                            </div>
                          </div>
                        </div>

                      </CTabPane>
                      <CTabPane data-tab="notification">


                        <div class="crse_content">
                          <h3>My courses ({courselist ? courselist.length : '0'})</h3>
                          <div class="_14d25">
                            <div class="row">



                              {courselist.map((cv, i) => {
                                return <div class="col-lg-3 col-md-4">
                                  <div class="fcrse_1 mt-30">
                                    <a href="#" class="fcrse_img">
                                      <img src={cv.thumbnail ? cv.thumbnail : images} style={{ height: '150px' }} alt="" />
                                      <div class="course-overlay">
                                        <div class="crse_reviews">
                                          <i class="uil uil-star"></i>{cv.rate}
                                        </div>
                                        <span class="play_btn1">
                                          <i class="uil uil-play"></i>
                                        </span>
                                      </div>
                                    </a>
                                    <div class="fcrse_content">
                                      <div class="eps_dots more_dropdown">
                                        <a href="#">
                                          <i class="uil uil-ellipsis-v"></i>
                                        </a>
                                        <div class="dropdown-content">
                                          <span>
                                            <i class="uil uil-share-alt"></i>Share
                                          </span>
                                          <span>
                                            <i class="uil uil-clock-three"></i>Save
                                          </span>
                                          <span>
                                            <i class="uil uil-ban"></i>Not Interested
                                          </span>
                                          <span>
                                            <i class="uil uil-windsock"></i>Report
                                          </span>
                                        </div>
                                      </div>
                                      <div class="vdtodt">
                                        <span class="">{cv.view} views</span>
                                        <span class="" style={{ marginLeft: "33px", marginTop: "-15px" }}>{cv.dayago}</span>
                                      </div>
                                      <a href="#" class="crse14s">
                                        {cv.title}
                                      </a>
                                      <a href="#" class="crse-cate">
                                        {cv.Category}
                                      </a>
                                      <div class="auth1lnkprce">
                                        {/* <p class="cr1fot">
          By <a href="#">John Doe</a>
        </p> */}
                                        <div class="prce142">${cv.price}</div>
                                        {/* <button class="shrt-cart-btn" title="cart">
          <i class="uil uil-shopping-cart-alt"></i>
        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              })

                              }







                            </div>
                          </div>
                        </div>

                      </CTabPane>
                      <CTabPane data-tab="privacy">


                        <div class="student_reviews">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="review_right">
                                <div class="review_right_heading">
                                  <h3>Discussions</h3>
                                </div>
                              </div>
                              <div class="cmmnt_1526">
                                <div class="cmnt_group">
                                  <div class="img160">
                                    <img
                                      src="images/left-imgs/img-1.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <textarea
                                    class="_cmnt001"
                                    placeholder="Add a public comment"
                                  ></textarea>
                                </div>
                                <button class="cmnt-btn" type="submit">
                                  Comment
                                </button>
                              </div>
                              <div class="review_all120">
                                <div class="review_item">
                                  <div class="review_usr_dt">
                                    <img
                                      src="images/left-imgs/img-1.jpg"
                                      alt=""
                                    />
                                    <div class="rv1458">
                                      <h4 class="tutor_name1">John Doe</h4>
                                      <span class="time_145">2 hour ago</span>
                                    </div>
                                    <div class="eps_dots more_dropdown">
                                      <a href="#">
                                        <i class="uil uil-ellipsis-v"></i>
                                      </a>
                                      <div class="dropdown-content">
                                        <span>
                                          <i class="uil uil-comment-alt-edit"></i>
                                          Edit
                                        </span>
                                        <span>
                                          <i class="uil uil-trash-alt"></i>Delete
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="rvds10">
                                    Nam gravida elit a velit rutrum, eget dapibus
                                    ex elementum. Interdum et malesuada fames ac
                                    ante ipsum primis in faucibus. Fusce lacinia,
                                    nunc sit amet tincidunt venenatis.
                                  </p>
                                  <div class="rpt101">
                                    <a href="#" class="report155">
                                      <i class="uil uil-thumbs-up"></i> 10
                                    </a>
                                    <a href="#" class="report155">
                                      <i class="uil uil-thumbs-down"></i> 1
                                    </a>
                                    <a href="#" class="report155">
                                      <i class="uil uil-heart"></i>
                                    </a>
                                    <a href="#" class="report155 ml-3">
                                      Reply
                                    </a>
                                  </div>
                                </div>
                                <div class="review_reply">
                                  <div class="review_item">
                                    <div class="review_usr_dt">
                                      <img
                                        src="images/left-imgs/img-3.jpg"
                                        alt=""
                                      />
                                      <div class="rv1458">
                                        <h4 class="tutor_name1">Rock Doe</h4>
                                        <span class="time_145">1 hour ago</span>
                                      </div>
                                      <div class="eps_dots more_dropdown">
                                        <a href="#">
                                          <i class="uil uil-ellipsis-v"></i>
                                        </a>
                                        <div class="dropdown-content">
                                          <span>
                                            <i class="uil uil-trash-alt"></i>
                                            Delete
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <p class="rvds10">
                                      Fusce lacinia, nunc sit amet tincidunt
                                      venenatis.
                                    </p>
                                    <div class="rpt101">
                                      <a href="#" class="report155">
                                        <i class="uil uil-thumbs-up"></i> 4
                                      </a>
                                      <a href="#" class="report155">
                                        <i class="uil uil-thumbs-down"></i> 2
                                      </a>
                                      <a href="#" class="report155">
                                        <i class="uil uil-heart"></i>
                                      </a>
                                      <a href="#" class="report155 ml-3">
                                        Reply
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </CTabPane>
                    </CTabContent>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CTabs>


    </>
  );
}
export default Instructor_profile_view;
