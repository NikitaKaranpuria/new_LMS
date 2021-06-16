import React from "react";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CModalFooter,
  CTooltip,
  CButton,
  CModal,
  CModalBody,
  CModalHeader
} from "@coreui/react";
import './course.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useHistory } from "react-router-dom";
import AboutTab from "./AboutTab"; // import course About tab fro CourseTab component
import ReviewTab from "./ReviewTab"; // import Review  content tab fro CourseTab component
import { useState, useEffect, useRef } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";

// course tab for course detail page
const CourseTabs = () => {
  const [course, setCourse] = useState([]);
  const [visible, setVisible] = useState(0)
  const myvideo = useRef(null)
  const [showPreview, setShowPreview] = useState(false)
  const [section, setSection] = React.useState([]);
  const [lesson, setLesson] = React.useState([]);
  const courseid = useParams();
  let history = useHistory()
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
  const GetSectionData = async () => {
    await axios.get(`${BaseUrl}forentend/courselesson/${courseid.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setSection(response.data.data)
    });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push('/sign_in')

    } else {
      GetCourseData()
      GetSectionData();
    }
  }, [])
  const playmyvideo = () => {
    if (myvideo.current.currentTime > 30) {

      myvideo.current.pause()
      setShowPreview(true)

    }


  }

  const Lessonpreview = (video_url, video_title) => {

    confirmAlert({

      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
            onDismiss={() => onClose}
          >
            <div className='p-2 d-flex justify-content-between' > <h5>{video_title} </h5> <h6 className='canclebutton' style={{ 'cursor': 'pointer' }} onClick={onClose}>&#128473;</h6> </div>
            <span style={{marginTop: "-23px",marginLeft: "83px",marginBottom: "10px"}}>For continue watching buy this course</span>
            <div style={{ height: "100%", width: "100%" }} >

              <video controls disablePictureInPicture controlsList="nodownload" style={{ height: "100%", width: "100%" }} ref={myvideo} onTimeUpdate={playmyvideo} src={video_url} />
            </div>

          </CModal>

        );

      }

    });

  }
  return (
    <>
      <div className="course_tabs">
        <nav>

          <div
            className="nav nav-tabs tab_crse justify-content-center"
            id="nav-tab"
            role="tablist"
            style={{ flexDirection: "column" }}
          >

            <CTabs activeTab="nav-about">
              <CNav variant="tabs" style={{ margin: "auto" }}>
                <CNavItem>
                  <CNavLink
                    data-tab="nav-about"
                    className="nav-item nav-link"
                    id="nav-about-tab"
                  >
                    About
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="nav-courses"
                    className="nav-item nav-link"
                    id="nav-courses-tab"
                  >
                    Content
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="nav-reviews"
                    className="nav-item nav-link"
                    id="nav-reviews-tab"
                  >
                    Reviews
                  </CNavLink>
                </CNavItem>
              </CNav>

              <div>
                {course.map((temp, index) => (
                  <CTabContent>
                    <CTabPane data-tab="nav-about">
                      <AboutTab id={temp.id} />
                    </CTabPane>
                    <CTabPane data-tab="nav-reviews">
                      <ReviewTab id={temp.id} />
                    </CTabPane>
                    <CTabPane data-tab="nav-courses">

                      {/* <ContentTab id={tempSection.course_id} sectionId={tempSection.id} /> */}
                      <div className="crse_content">
                        <h3>Course content</h3>
                        <div className="_112456">
                          <ul className="accordion-expand-holder">
                            {/* <li>
                              <span className="accordion-expand-all _d1452">Expand all</span>
                            </li>
                            <li>
                              <span className="_fgr123"> 200 lectures</span>
                            </li>
                            <li>
                              <span className="_fgr123">47:06:29</span>
                            </li> */}
                          </ul>
                        </div>
                        {section.length  ? <>
                          {section.map((sectionList, index) => (
                            <div key={index}>
                              <div id="accordion" className="ui-accordion ui-widget ui-helper-reset">

                                <Link
                                  to="/"
                                  className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"
                                >
                                  <div className="section-header-left">
                                    <span className="section-title-wrapper">
                                      <i className="uil ui l-presentation-play crse_icon"></i>
                                      <span className="section-title-text">{sectionList.title}</span>
                                    </span>
                                  </div>
                                  <div className="section-header-right">

                                    <span className="section-header-length">{sectionList.duration}</span>
                                  </div>
                                </Link>
                                {sectionList.lesson.map((lessonlist, index) => (
                                  <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                                    <div className="lecture-container">
                                      <div className="left-content">
                                        <i className="uil uil-file icon_142"></i>
                                        <div className="top">
                                          <div className="title">{lessonlist.title}</div>
                                        </div>
                                      </div>
                                      <div className="details">
                                        {
                                          lessonlist.lesson_type === 'Video_file' ? <a className="content-summary" onClick={() => Lessonpreview(lessonlist.video_url, lessonlist.title)} style={{ 'cursor': 'pointer' }} title='preview for video file'> Preview</a> : 'Document'
                                        }

                                      </div>
                                      <div className="details">
                                        <span className="content-summary">{lessonlist.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  //     <Link className="btn1458" to="#">
                                  //       20 More Sections
                                  // </Link>
                                ))}
                              </div>
                            </div>

                          ))}</>:
                          <p style={{marginTop:"40px",fontSize:"15px"}}>No content available</p>}
                        </div>
                    </CTabPane>

                  </CTabContent>
                ))}
                   
              </div>

            </CTabs>
          </div>


        </nav>
      </div>
    </>
      );
};

      export default CourseTabs;
