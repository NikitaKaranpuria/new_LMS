import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import {View, PropTypes} from 'react-view';
import { useHistory } from "react-router-dom";
//course about tabe for course tab component
function AboutTab(id) {
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
  }, []);
  const [course, setCourse] = useState([])

  const courseid = useParams();
  const GetCourseData = async () => {
    await axios
      .get(`${BaseUrl}forentend/onecourse/${courseid.id}`, {
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
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push('/sign_in')

    } else {
      GetCourseData()
    }
  }, [])

  return (
    <>
      <div className="_htg451">
        <div className="_htgdrt mt-35">
          <div className="_scd123">
            <div className="row">
              {course.map((Course, index) => (
                <div>
                  <div className="col-lg-12" style={{ marginBottom: "30px" }}>
                    <h3>Description</h3>
                    <ul className="_htg452 _abcd145">
                      <li>
                        <div className="_5f7g15">
                          {/* <i className="fas fa-check-circle"></i> */}
                        
                            {/* {Course.description ? Course.description.replace(/^"(.+)"$/,'$1') : null} */}
                            <ol>
                                                                {" "}
                                                                {Course.description &&
                                                                    Course.description
                                                                        .length
                                                                    ? Course.description.map(
                                                                        (desc, index) => (
                                                                            <li>
                                                                                <p
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: desc
                                                                                    }}
                                                                                />
                                                                            </li>
                                                                        )
                                                                    )
                                                                    : null}
                                                            </ol>
             
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <h3>Requirements</h3>
                    <ul className="_htg452 _abcd145">
                      <li>
                        <div className="_5f7g15">
                          {/* <i className="fas fa-check-circle"></i> */}
                          <span>
                            {Course.requirements ? Course.requirements : null}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutTab;
