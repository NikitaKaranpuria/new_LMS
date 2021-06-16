import React, { useState, useEffect } from "react";
import "./unicons.css";
import "./vertical-responsive-menu1.min.css";
import "./student_dashboard.css";
import "./student_responsive.css";
import "./night-mode.css";
import "./all.min.css";
import "./semantic.min.css";
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
  const [userdata, SetUserData] = useState([])
  const [categories, SetCategories] = useState([])
  const [cart, SetCartData] = useState([])
  const [serchtext,Setserchtext]=useState('')
  let history = useHistory();
  const handleKeyDown = (event) => {
    Setserchtext(event.target.value)
    if (event.key === 'Enter') {
    //  Setserchtext(event.target.value)
     history.push(`/search_result/${serchtext}`)
    }
    // history.push(`/courseoverview/${serchtext}`)
  }
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
  const toggleProfile = () => {
    setActive(!isActive);
  };
  const CategoryListAPICall = (CategoryID) => {
    // console.log("catgeory")
    localStorage.removeItem('CategoryID')
    localStorage.setItem("CategoryID", JSON.stringify(CategoryID.id));
    // console.log("id",CategoryID.id)

    history.push("/search_results");
  };
  const UserAPICall = async () => {
    // console.log("user data header")
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
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    UserAPICall()
    CartTotalAPICall()
    getCategories()
  }, [])

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
              src={logo}
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
        <div className="search120" >
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
            {/* <li>
              <Link to="#" className="upload_btn" title="Create New Course">
                SafetyTek for Business
              </Link>
            </li> */}
            <li>
              <div className="">
                {/* <Link to="#" className="hde151">
                  Tech On SafetyTek
                </Link> */}
                <Link to={"/"}
                  className="upload_btn"
                  title="Tech On SafetyTek"
                >
                  Tech On SafetyTek
                    </Link>
              </div>
            </li>
            {cart.map((cv,index)=>(
                <li>
              <Link to="/shopping_cart" className="option_links" title="cart">
                <i className="uil uil-shopping-cart-alt"></i>
                <span className="noti_count">{cv.TotalItem}</span>
              </Link>
            </li>
            ))}
          
            {userdata.map((tempuser, index) => (

              <li className="ui dropdown">
                <a
                  className="opts_account"
                  title="Account"
                  onClick={toggleProfile}
                >
                  <img src={tempuser.image ? tempuser.image : hd_dp} alt="" />
                </a>
                <div
                  className="menu dropdown_account"
                  style={{
                    display: isActive ? "block" : "none",
                    marginLeft: "-150px",
                  }}
                >
                  <div className="channel_my">
                    <div className="profile_link">
                   <Link to={"/"}>   <img src={tempuser.image ? tempuser.image : hd_dp} alt="" /></Link>
                      <div className="pd_content">
                        <div className="rhte85">
                          <h6>{tempuser.first_name ? tempuser.first_name : null}</h6>
                          <div className="mef78" title="Verify">
                            <i className="uil uil-check-circle"></i>
                          </div>
                        </div>
                        <span>{tempuser.email ? tempuser.email : null}</span>
                      </div>
                    </div>
                    {tempuser.id_group == "3" ? <>
                      <Link to={`/instructor/instructor_profile_view/${userdata.id}`} className="dp_link_12">
                        View Instructor Profile
                  </Link>
                    </> :
                      <Link to={`/edit_profile/${userdata.id}`} className="dp_link_12">
                        Edit Profile
               </Link>}

                  </div>
                  {tempuser.id_group == "3" ? <>


                    <Link to={"/instructor/instructor_dashboard"} className="item channel_item">
                      Dashboard
                    </Link>
                  </> :
                    <Link to={"/student/student_dashboard"} className="item channel_item">
                      Dashboard
                  </Link>
                  }
                  <Link to={"/changePassword"} className="item channel_item">
                    Change Password
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
                  <Link to="/sign_in" className="item channel_item">
                    Sign Out
                </Link>
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
