import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import BaseUrl from "../../views/BaseUrl/BaseUrl";
import { useHistory } from "react-router-dom";

//for company registration component for index page
function Company() {
  const [userdata, SetUserData] = useState([])
  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push('/sign_in')

    } else {
      UserAPICall()
    }
  }, []);


  const UserAPICall = async () => {
    await axios.get(`${BaseUrl}forentend/users`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetUserData(response.data.data[0])
    });
  }
  return (
    <>

      <div class="fcrse_3">
        {userdata.id_group == "3" ? <>
          <div class="cater_ttle">
            <h4>For Company</h4>
          </div>
          <div class="live_text">
            <div class="live_icon">
              <i class="uil uil-kayak"></i>
            </div>
            <div class="live-content">
              <p>Subscribe to courses and invite your employee</p>
              <Link to={"/SafetyBusinessForm"}> <button class="live_link">
                Get Started
            </button></Link>
              <span class="livinfo">Info : This feature only for 'Company'.</span>
            </div>
          </div>
        </> : null}  </div>
    </>
  );
}

export default Company;
