import React from "react";
import CourseTitile from "./CourseTitile"; //import course title component
import InstructorDetail from "./InstructorDetail"; //import Instructor Detail  component
import CourseTabs from "./CourseTabs"; //import  Course tabs fro about content and review  component
import { CContainer } from "@coreui/react";
import { useHistory } from "react-router-dom";

import { useEffect } from "react";
//course detal page
const CourseDetail = () => {
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
  }, []);

  return (
    <>
      <CourseTitile />
      <InstructorDetail />
      <CContainer fluid>
        <CourseTabs />
      </CContainer>
    </>
  );
};
export default CourseDetail;
