import React, { useState, useEffect } from "react";
import "./unicons.css";
import "./vertical-responsive-menu1.min.css";
import "./instructor-dashboard.css";
import "./instructor-responsive.css";
import "./night-mode.css";
import "./all.min.css";
import "./semantic.min.css";
import "./steps.css";
import { useHistory } from "react-router-dom";
import logo from "../images/logo-st-lms.png";
import hd_dp from "../images/hd_dp.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../views/BaseUrl/BaseUrl";
//instructor dashboard header component
function InstructorHeader() {
  //for toggle profile dropdown list
  const [isActive, setActive] = useState(false);
  const [cart, SetCartData] = useState([])

  const toggleProfile = () => {
    setActive(!isActive);
  };
  const [categories, SetCategories] = useState([]);
  const [userdata, SetUserData] = useState([]);
  const [serchtext,Setserchtext]=useState('')
  let histrory = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push("/sign_in");
    } else {
      getCategories();
      UserAPICall();
    }
  }, []);
  const getCategories = async () => {
    await axios
      .get(`${BaseUrl}forentend/listcategory`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetCategories(response.data);
      });
  };
  const signOut = () => {
    localStorage.removeItem("LMS_Token");
    localStorage.removeItem("LMS_Frontend_EMAIL");
    localStorage.removeItem("LMS_Frontend_Name");
    localStorage.removeItem("LMS_Frontend_UserType");
    histrory.push("sign_in");
  };
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/sign_in`);
    }
    getCategories();
    CartTotalAPICall()
  }, []);
  let history = useHistory();
  const handleKeyDown = (event) => {
    Setserchtext(event.target.value)
    if (event.key === 'Enter') {
    //  Setserchtext(event.target.value)
     history.push(`/search_result/${serchtext}`)
    }
    // history.push(`/courseoverview/${serchtext}`)
  }
  const CategoryListAPICall = (CategoryID) => {
    localStorage.removeItem('CategoryID')
    // console.log("catgeory")
    localStorage.setItem("CategoryID", JSON.stringify(CategoryID.id));
    // console.log("id",CategoryID)

    history.push("/search_results");
  };
  const UserAPICall = async () => {
    // console.log("user data header");
    await axios
      .get(`${BaseUrl}forentend/users`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        // console.log(response, "user list");
        SetUserData(response.data.data);
      });
  };

  const CartTotalAPICall = async () => {
    // console.log("cart total")
    await axios.get(`${BaseUrl}forentend/carttotal`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      // console.log(response.data.data, "cart total")
      SetCartData(response.data.data)
    });
  }



  return (
    <>
      <header className="header clearfix">
        <div className="main_logo" id="logo">
          <Link to={"/"}>
            <img src={logo} alt="" height="auto" width="80%" />
          </Link>
          <Link to={"/"}>
            <img
              className="logo-inverse"
              src="images/logo-st-lms"
              alt=""
              height="auto"
              width="100%"
            />
          </Link>
        </div>
        <div className="top-category">
          <div className="ui compact menu cate-dpdwn">
            <div className="ui simple dropdown item">
              <Link to="#" className="option_links p-0" title="categories">
                Categories
              </Link>
              <div className="menu dropdown_category5">
                {categories.map((cv, i) => {
                  return (
                    <Link
                      onClick={() => {
                        CategoryListAPICall(cv);
                      }}
                      className="item channel_item"
                    >
                      {cv.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="search120">
          <div className="ui search">
            <div className="ui left icon input swdh10">
              <input
                className="prompt srch10"
                type="text"
                placeholder="Search for anything..."
                onKeyDown={handleKeyDown}
              />
              <i className="uil uil-search-alt icon icon1"></i>
            </div>
          </div>
        </div>
        <div className="header_right">
          <ul>
            <li>
              <Link
                to="/instructor/instructor_new_course"
                className="upload_btn"
                title="Create New Course"
                style={{ backgroundColor: "#507da7" }}
              >
                Create New Course
              </Link>
            </li>

            <li>
              {cart.map((cv, index) => (
                <Link to="/shopping_cart" className="option_links" title="cart">
                  <i className="uil uil-shopping-cart-alt"></i>
                  <span
                    className="noti_count"
                    style={{ backgroundColor: "#507da7" }}
                  >
                    {cv ? cv.TotalItem : null}
                  </span>
                </Link>
              ))}   </li>


            {userdata.map((userdata, index) => (
              <li className="ui dropdown">
                <div>
                  <a
                    className="opts_account"
                    title="Account"
                    onClick={toggleProfile}
                  >
                    <img src={userdata.image ? userdata.image : hd_dp} alt="" />
                  </a>
                </div>
                <div
                  className="menu dropdown_account"
                  style={{
                    display: isActive ? "block" : "none",
                    marginLeft: "-150px",
                  }}
                >
                  <div className="channel_my">
                    <div className="profile_link">
                      <Link to={"/"}>
                        <img
                          src={userdata.image ? userdata.image : hd_dp}
                          alt=""
                        />
                      </Link>
                      <div className="pd_content">
                        <div className="rhte85">
                          <h6>
                            {userdata.first_name ? userdata.first_name : null}
                          </h6>
                          <div className="mef78" title="Verify">
                            <i className="uil uil-check-circle"></i>
                          </div>
                        </div>
                        <span>{userdata.email ? userdata.email : null}</span>
                      </div>
                    </div>
                    <Link
                      to={`/profile_view/${userdata.id}`}
                      className="dp_link_12"
                    >
                      View Instructor Profile
                    </Link>
                  </div>

                  <Link
                    to={"/instructor/instructor_dashboard"}
                    className="item channel_item"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/instructor/instructor_setting"}
                    className="item channel_item"
                  >
                    Setting
                  </Link>
                  {/* <Link to={"/"} className="item channel_item">
                  Memberships
                </Link>
                <Link to={"/"} className="item channel_item">
                  Setting
                </Link>
                <Link to={"/"} className="item channel_item">
                  Help
                </Link> */}
                  <li onClick={signOut} className="item channel_item">
                    Sign Out
                  </li>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}

export default InstructorHeader;
