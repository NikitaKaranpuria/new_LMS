import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'

import { NavLink } from "react-router-dom";
//instructor dashboard sidebar navigation component
const InstructorSidebar = () => {

  // const LeftMenu = async () => {
  //   console.log("Left menu")
  //   $(document).ready(function () {
  //     $(".left_section li").click(function () {
  //       $(".left_section li").removeClass("active");
  //       $(this).addClass("active");
  //     });
  //   });
  // }


  return (
    <nav className="vertical_nav">
      <div className="left_section menu_left" id="js-menu">
        <div className="left_section">
          <ul>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_dashboard"
                className="menu--link "
                title="Dashboard"
              >
                <i className="uil uil-apps menu--icon"></i>
                <span className="menu--label">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_courses"
                className="menu--link"
                title="Courses"
              >
                <i className="uil uil-book-alt menu--icon"></i>
                <span className="menu--label">My Courses</span>
              </NavLink>
            </li>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_notifications"
                className="menu--link"
                title="Notifications"
              >
                <i className="uil uil-bell menu--icon"></i>
                <span className="menu--label">Notifications</span>
              </NavLink>
            </li>
            {/* <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_all_reviews"
                className="menu--link"
                title="Reviews"
              >
                <i className="uil uil-star menu--icon"></i>
                <span className="menu--label">Reviews</span>
              </NavLink>
            </li> */}
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_earning"
                className="menu--link"
                title="Earning"
              >
                <i className="uil uil-dollar-sign menu--icon"></i>
                <span className="menu--label">Earning</span>
              </NavLink>
            </li>
            {/* <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_payout"
                className="menu--link"
                title="Payout"
              >
                <i className="uil uil-wallet menu--icon"></i>
                <span className="menu--label">Payout</span>
              </NavLink>
            </li> */}
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_statements"
                className="menu--link"
                title="Statements"
              >
                <i className="uil uil-file-alt menu--icon"></i>
                <span className="menu--label">Statements</span>
              </NavLink>
            </li>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_verification"
                className="menu--link"
                title="Verification"
              >
                <i className="uil uil-check-circle menu--icon"></i>
                <span className="menu--label">Verification</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="left_section pt-2">
          <ul>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/instructor_setting"
                className="menu--link"
                title="Setting"
              >
                <i className="uil uil-cog menu--icon"></i>
                <span className="menu--label">Settings</span>
              </NavLink>
            </li>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/instructor/feedback"
                className="menu--link"
                title="Send Feedback"
              >
                <i className="uil uil-comment-alt-exclamation menu--icon"></i>
                <span className="menu--label">Send Feedback</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default InstructorSidebar;
