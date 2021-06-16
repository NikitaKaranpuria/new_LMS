import React from "react";
import Leftimage from "../../images/left-imgs/img-1.jpg";
import "./instructorstyle.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
//instructor notification component for instructor notification page
function InstructorNitification(params) {
  const [notification, setNotification] = useState([]);
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    Notificationdata();
  }, []);
  const Notificationdata = async () => {
    await axios
      .get(`${BaseUrl}forentend/notificationlist`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setNotification(response.data.data);
      });
  };

  return (
    <>
      <div className="sa4d25" id="instructorstyle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="st_title">
                <i className="uil uil-bell"></i> Notifications
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* <a href="#" className="setting_noti">
                Notification Setting
              </a> */}
              <div className="all_msg_bg">



                {notification.map((cv, i) => {
                  return <div className="channel_my item all__noti5">
                    <div className="profile_link">
                      <img src={Leftimage} alt="" />
                      <div className="pd_content">
                        <h6>{cv.first_name} {cv.last_name}</h6>
                        <p className="noti__text5">
                          {cv.message}
                        </p>
                        <span className="nm_time">{cv.created_at}</span>
                      </div>
                    </div>
                  </div>

                })
                }




              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorNitification;
