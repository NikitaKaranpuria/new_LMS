import React from "react";
import { useLocation } from "react-router-dom";
import InstructorHeader from "./InstructorHeader";
import StudentHeader from "./StudentHeader";
import StudentSideBar from "./StudentSideBar";
import DashnoardFooter from "./DashnoardFooter";
import InstructorSideBar from "./InstructorSideBar";

import { TheContent, TheFooter, TheHeader, TheSidebar } from "./index";
import { CRow, CCol } from "@coreui/react";
const TheLayout = () => {
  const location = useLocation();
  const str = location.pathname;
  const CheckHeacer = () => {
    if (str.includes("instructor")) {
      return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <InstructorHeader />
            <CRow>
              <CCol sm="2">
                <InstructorSideBar />
              </CCol>
              <CCol sm="10">
                <div
                  className="c-body mt-4 pt-2"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <TheContent />
                </div>
                <DashnoardFooter />
              </CCol>
            </CRow>
          </div>
        </div>
      );
    }

    if (str.includes("student")) {
      return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <StudentHeader />
            <CRow>
              <CCol sm="2">
                <StudentSideBar />
              </CCol>
              <CCol sm="10">
                <div
                  className="c-body mt-4 pt-2"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <TheContent />
                </div>
                <TheFooter />
              </CCol>
            </CRow>
          </div>
        </div>
      );
    } else {
      return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <TheHeader />
            <CRow>
              <CCol sm="12">
                <div
                  className="c-body mt-4 pt-2"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <TheContent />
                </div>
                <TheFooter />
              </CCol>
            </CRow>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <CheckHeacer />
    </>
  );
};

export default TheLayout;
