import React, { useState, useEffect } from "react";
import "./studentstyle.css";
import instructorFeedbackvalidation from "../instructor/instructorFeedbackvalidation";
import {
  CModalFooter,
  CTooltip,
  CButton,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CSelect,
  CModalHeader,
} from "@coreui/react";
import axios from "axios";

import BaseUrl from "../BaseUrl/BaseUrl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
function StudentFeedback(params) {
  const [MyCourse, SetMyCourse] = useState([]);
  const GetMyCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/purchaselist`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetMyCourse(response.data);
      });
  };

  useEffect(() => {
    GetMyCourse();
  });

  const [instructorFeedback, setInstructorFeddBack] = useState({
    email: "",
    issue: "",
  });

  const [imges, Setimages] = useState("");
  const [imageError, SetImageError] = useState({
    email: "",
    issue: "",
    screenshote: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    SetImageError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    setInstructorFeddBack((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onChangeImage = (e) => {
    SetImageError("");
    try {
      if (e.target.files[0].size > 5242880) {
        SetImageError({ screenshote: "image size is above 5mb" });
      } else {
        Setimages(e.target.files[0]);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const sendFeedback = async () => {
    if (
      Object.keys(instructorFeedbackvalidation(instructorFeedback)).length > 0
    ) {
      SetImageError(instructorFeedbackvalidation(instructorFeedback));
    }
    if (
      Object.keys(instructorFeedbackvalidation(instructorFeedback)).length === 0
    ) {
      const FeedbackAddData = new FormData();

      FeedbackAddData.append("email", instructorFeedback.email);
      FeedbackAddData.append("issue", instructorFeedback.issue);

      FeedbackAddData.append("screenshote", imges, imges.name);
      await axios
        .post(`${BaseUrl}forentend/feedback`, FeedbackAddData, {
          headers: {
            method: "POST",
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then((responce) => {
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
                    <h4>Feedback is Submited Successfully</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      style={{
                        backgroundColor: "rgb(155, 61, 53)",
                        color: "white",
                      }}
                      className="btn btn-block"
                      onClick={onClose}
                    >
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
        })
        .catch((error) => {
          // console.log("feed back is not submitted");
        });
    }
  };
  return (
    <div className="sa4d25" id="instructorstyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-comment-info-alt"></i> Send Feedback
            </h2>
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="ui search focus">
                  <label for="file5">My Courses</label>
                  <div className="ui left icon input swdh11 swdh19">
                    <CSelect
                      custom
                      name="email"
                      id="email"
                      onChange={change}
                      value={instructorFeedback.email}
                      // innerRef={register({ required: true })}
                    >
                      <option value="">Select Your Course</option>
                      {MyCourse.map((cv, i) => (
                        <option key={i} value={cv.id}>
                          {cv.course_title}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
                {imageError.issue && (
                  <p className="text-danger">{imageError.issue}</p>
                )}

                <div className="ui search focus mt-30">
                  <div className="ui form swdh30">
                    <div className="field">
                      <textarea
                        rows="6"
                        name="issue"
                        value={instructorFeedback.issue}
                        id="id_about"
                        placeholder="Describe your issue or share your ideas"
                        onChange={change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {imageError.issue && (
                  <p className="text-danger">{imageError.issue}</p>
                )}
                <div className="form-group1 mt-30">
                  <label for="file5">Add Screenshots</label>
                  <div className="image-upload-wrap">
                    <input
                      className="file-upload-input"
                      id="file5"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={onChangeImage}
                    />
                    <div className="drag-text">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <h4>Select screenshots to upload</h4>
                      <p>or drag and drop screenshots</p>
                    </div>
                  </div>
                  <p className="text-danger">{imageError.screenshote}</p>
                </div>
                <button
                  className="save_btn"
                  onClick={sendFeedback}
                  type="submit"
                >
                  Send Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentFeedback;
