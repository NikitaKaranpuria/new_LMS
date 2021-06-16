import React from "react";
import { NavLink } from "react-router-dom";
//instructor dashboard sidebar navigation component
const StudentSideBar = () => {
  return (
    <nav className="vertical_nav">
      <div className="left_section menu_left" id="js-menu">
        <div className="left_section">
          <ul>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_dashboard"
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
                to="/student/student_courses"
                className="menu--link "
                title="Courses"
              >
                <i className="uil uil-book-alt menu--icon"></i>
                <span className="menu--label">My Courses</span>
              </NavLink>
            </li>

            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_notifications"
                className="menu--link"
                title="Notifications"
              >
                <i className="uil uil-bell menu--icon"></i>
                <span className="menu--label">Notifications</span>
              </NavLink>
            </li>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_certificates"
                className="menu--link"
                title="My Certificates"
              >
                <i className="uil uil-award menu--icon"></i>
                <span className="menu--label">My Certificates</span>
              </NavLink>
            </li>
            {/* <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_all_reviews"
                className="menu--link"
                title="Reviews"
              >
                <i className="uil uil-star menu--icon"></i>
                <span className="menu--label">Reviews</span>
              </NavLink>
            </li> */}
            {/* <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_credits"
                className="menu--link"
                title="Credits"
              >
                <i className="uil uil-wallet menu--icon"></i>
                <span className="menu--label">Wallet</span>
              </NavLink>
            </li> */}
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_statements"
                className="menu--link"
                title="Statements"
              >
                <i className="uil uil-file-alt menu--icon"></i>
                <span className="menu--label">Payments</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="left_section pt-2">
          <ul>
            <li className="menu--item">
              <NavLink
                activeClassName="menu--link active"
                to="/student/student_setting"
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
                to="/student/student_feedback"
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

export default StudentSideBar;
