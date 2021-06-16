import React from "react";
import PopularExperts from "./PopularExperts";
import NewCoursefrom from "./NewCourse";
import Company from "./Company";
import RecomndationCategory from "./RecomndationCategory";
import TopCourses from "./TopCourses";
import Course from "./Course";

import WhatOtherSay from "./WhatOtherSay";
import { CCol, CRow, CContainer } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../views/BaseUrl/BaseUrl";
function Index() {
  const [userdata, SetUserData] = useState([])

  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    UserAPICall()
    localStorage.removeItem('CategoryID');
  }, []);
  const UserAPICall = async () => {
    console.log("user data header")
    await axios.get(`${BaseUrl}forentend/users`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      // console.log(response, "user list")
      SetUserData(response.data.data)
    });
  }
  return (
    <>
      <CContainer fluid className="c-body mt-4">
        <CRow>
          <CCol sm="9">
            <PopularExperts />
            <NewCoursefrom />
            <TopCourses />
            <Course />
          </CCol>
          <CCol sm="3">
            <Company />
            <RecomndationCategory />
            {/* <div className="strttech120"> */}
            <div>
              {userdata.map((cv, index) => (
                cv.id_group == "3" ? <>
                </> :
                  <>
                    {/* <div className="strttech120">
                      <h4>Become an Instructor</h4>
                      <p>
                        Top instructors from around the world teach millions of students
                        on Cursus. We provide the tools and skills to teach what you
                        love.
              </p>
                      <Link to={"/becomeAnInstructor"}><button className="Get_btn" onClick="window.location.href = '#';">
                        Start Teaching
              </button>
                      </Link>
                    </div> */}
                  </>
              ))}
            </div>
          </CCol>
        </CRow>
        
      </CContainer>
    </>
  );
}

export default Index;
