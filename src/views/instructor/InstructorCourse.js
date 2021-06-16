import React from "react";
import MyCourseTab from "./instructorCourseComponent/MyCourseTab";
import MyPurchaseTab from "./instructorCourseComponent/MyPurchaseTab";
import UpcomingCourseTab from "./instructorCourseComponent/UpcomingCourseTab";
import DiscountTab from "./instructorCourseComponent/DiscountTab";
import "./instructorstyle.css";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
//instructor course  component for instructor nstructor course
function InstructorCourse(params) {
  let histrory = useHistory()
  const cretecourse=()=>{
    histrory.push('/instructor/instructor_new_course')
  }

  return (
    <div className="sa4d25" id="instructorstyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-book-alt"></i>Courses
            </h2>
          </div>
          <div className="col-md-12">
            <div className="card_dash1">
              <div className="card_dash_left1">
                <i className="uil uil-book-alt"></i>
                <h1>Want to create one more course?</h1>
              </div>
              <div className="card_dash_right1">
                <button
                  className="create_btn_dash"
                  onClick={
                    cretecourse
                  }
                >
                  Create your course
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="my_courses_tabs">
              <CTabs activeTab={localStorage.getItem('upcommingtab')?localStorage.getItem('upcommingtab'):localStorage.getItem('mypurchasetab')?localStorage.getItem('mypurchasetab'):"mycourse"}

              
              >
                <div className="my_crse_nav">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="mycourse">
                        <span className="mytabs">
                          <i className="uil uil-book-alt"></i>My Courses
                        </span>
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="mypurchase">
                        <i className="uil uil-download-alt"></i>My Purchases
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="upcommingcourse">
                        <i className="uil uil-upload-alt"></i>Submitted Courses
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="archivecourse">
                        <i className="uil uil-archive-alt"></i>Archive Courses
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="discount">
                        <i className="uil uil-tag-alt"></i>Discounts
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <CTabContent>
                    <CTabPane data-tab="mycourse">
                      <MyCourseTab />
                    </CTabPane>
                    <CTabPane data-tab="mypurchase">
                      <MyPurchaseTab />
                    </CTabPane>
                    <CTabPane data-tab="upcommingcourse">
                      <UpcomingCourseTab />
                    </CTabPane>
                    <CTabPane data-tab="discount">
                      <DiscountTab />
                    </CTabPane>
                  </CTabContent>
                  <div
                    className="tab-pane fade"
                    id="pills-promotions"
                    role="tabpanel"
                    aria-labelledby="pills-promotions-tab"
                  >
                    <div className="promotion_tab mb-10">
                      <img src="images/dashboard/promotion.svg" alt="" />
                      <h4>Baby promotion plan is activated!</h4>
                      <p>
                        By activating promotion plans you can improve course
                        views and sales.
                      </p>
                      <button
                        className="plan_link_btn"
                        onClick="window.location.href = '#';"
                      >
                        Change New Plan
                      </button>
                    </div>
                  </div>
                </div>
              </CTabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InstructorCourse;
