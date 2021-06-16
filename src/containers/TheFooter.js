import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../views/BaseUrl/BaseUrl";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
//footer component
const TheFooter = () => {
  const [userdata, SetUserData] = useState([])

  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    UserAPICall()
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
    
      SetUserData(response.data.data)
    });
  }
  return (
    <footer className="footer mt-30">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <Link to="#">About</Link>
              <Link to="#">Blog</Link>
              <Link to="#">Careers</Link>
              <Link to="#">Pressrelease</Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <Link to="#">Help</Link>
              <Link to="#">Advertise</Link>
              <Link to="#">Become a Partner</Link>
              <Link to="#">Contact Us</Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <Link to="#">Copyright Policy</Link>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Sitemap</Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f3">
              {userdata.map((cv, i) => (
                cv.id_group == "3" ? <>
                </> :
                  <>
                    <Link to={"/becomeAnInstructor"} className="btn1542">
                      Become an Instructor
              </Link>
                  </>
              ))}

              <div className="lng_btn">
                <div
                  className="ui language bottom right pointing floating"
                  id="languages"
                >
                  <Link to="#">
                    <i className="uil uil-message lft"></i>Subscribe
                    <i className="uil uil-angle-down rgt"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="footer_bottm">
              <div className="row">
                <div className="col-md-6">
                  <ul className="fotb_left">
                    <li>
                      <Link to="/"></Link>
                    </li>
                    <li>
                      <p>
                        © 2021 <strong>SafetyTek</strong>. All Rights Reserved.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="edu_social_links">
                    <Link to="#">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-google-plus-g"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-instagram"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-youtube"></i>
                    </Link>
                    <Link to="#">
                      <i className="fab fa-pinterest-p"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(TheFooter);
