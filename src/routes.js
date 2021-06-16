import React from "react";
const IndexPage = React.lazy(() => import("./views/mainpage/index"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const ShopingCart = React.lazy(() => import("./views/cart/ShopingCart"));
const CheckoutCourse = React.lazy(() => import("./views/checkoutCourse/index"));
const CourseDetail = React.lazy(() => import("./views/courseDetail/index"));
const InstructorCourseEdit = React.lazy(() => import("./views/instructor/InstructorCourseEdit"));

const  CourseListing= React.lazy(() => import("./views/mainpage/CourseListing"));
const SearchResult = React.lazy(() =>
  import("./views/searchResult/SearchResult")
);
const Accordian = React.lazy(() => import("./views/searchResult/Accordian"));
const InstructorVerification = React.lazy(() =>
  import("./views/instructor/InstructorVerification")
);
const InstructorNotifications = React.lazy(() =>
  import("./views/instructor/InstructorNotifications")
);
const InstructorDashboard = React.lazy(() =>
  import("./views/instructor/Dashboard")
);
const InstructorCourse = React.lazy(() =>
  import("./views/instructor/InstructorCourse")
);
const InstructorAllReview = React.lazy(() =>
  import("./views/instructor/InstructorAllReview")
);
const InstructorEarning = React.lazy(() =>
  import("./views/instructor/InstructorEarning")
);
const InstructorPayout = React.lazy(() =>
  import("./views/instructor/InstructorPayout")
);
const InstructorFeedback = React.lazy(() =>
  import("./views/instructor/InstructorFeedback")
);
const InstructorStatement = React.lazy(() =>
  import("./views/instructor/InstructorStatement")
);
const InstructorSetting = React.lazy(() =>
  import("./views/instructor/InstructorSetting")
);
const InstructorNewCourse = React.lazy(() =>
  import("./views/instructor/InstructorNewCourse")
);
const InstructorProfileView = React.lazy(() =>
  import("./views/instructor/Instructor_profile_view")
);
const StudentDashboard = React.lazy(() =>
  import("./views/student/Dashboard.js")
);

const StudentCourses = React.lazy(() =>
  import("./views/student/StudentCourses.js")
);

const StudentNotifications = React.lazy(() =>
  import("./views/student/StudentNotifications.js")
);

const StudentCertificates = React.lazy(() =>
  import("./views/student/StudentCertificates.js")
);
const StudentAllReviews = React.lazy(() =>
  import("./views/student/StudentAllReviews.js")
);
const StudentCredits = React.lazy(() =>
  import("./views/student/StudentCredits.js")
);
const StudentStatements = React.lazy(() =>
  import("./views/student/StudentStatements.js")
);
const StudentFeedback = React.lazy(() =>
  import("./views/student/StudentFeedback.js")
);
const StudentSetting = React.lazy(() =>
  import("./views/student/StudentSetting.js")
);
const InstructorLessonEdit = React.lazy(() =>
  import("./views/instructor/InstructorLessonEdit")
);
const CompanyForm = React.lazy(() =>
  import("./views/mainpage/CompanyForm")
);

const BecomeAnInstructor = React.lazy(() =>
  import("./views/mainpage/BecomeAnInstructor")
);
const Header = React.lazy(() =>
  import("./views/Courseoverview/Header")
);
const routes = [
  { path: "/", exact: true, name: "Home", component: IndexPage },
  { path: "/sign_in", exact: true, name: "Home", component: Login },
  { path: "/sign_up", exact: true, name: "Home", component: Register },

  { path: "/page404", exact: true, name: "Home", component: Page404 },
  { path: "/page500", exact: true, name: "Home", component: Page500 },
  { path: "/shopping_cart", exact: true, name: "Home", component: ShopingCart },
  {
    path: "/checkout_course",
    exact: true,
    name: "Home",
    component: CheckoutCourse,
  },
  {
    path: "/instructor/instructor_lesson_edit/:id",
    exact: true,
    name: "InstructorLessonEdit",
    component: InstructorLessonEdit,
  },
  {
    path: "/course_detail/:id",
    exact: true,
    name: "Home",
    component: CourseDetail,
  },
  {
    path: "/search_results/",
    exact: true,
    name: "Home",
    component: SearchResult,
  },
  {
    path: "/search_result/:id",
    exact: true,
    name: "Home",
    component: SearchResult,
  },
  {
    path: "/course-Listing",
    exact: true,
    name: "Home",
    component: CourseListing,
  },
  { path: "/Accordian", exact: true, name: "Home", component: Accordian },
  {
    path: "/instructor/instructor_verification",
    exact: true,
    name: "Home",
    component: InstructorVerification,
  },
  {
    path: "/instructor/instructor_notifications",
    exact: true,
    name: "Home",
    component: InstructorNotifications,
  },
  {
    path: "/instructor/instructor_dashboard",
    exact: true,
    name: "Home",
    component: InstructorDashboard,
  },
  {
    path: "/instructor/instructor_courses",
    exact: true,
    name: "Home",
    component: InstructorCourse,
  },
  {
    path: "/instructor/instructor_all_reviews",
    exact: true,
    name: "Home",
    component: InstructorAllReview,
  },
  {
    path: "/instructor/instructor_earning",
    exact: true,
    name: "Home",
    component: InstructorEarning,
  },
  {
    path: "/instructor/instructor_courses_edit/:id",
    exact: true,
    name: "Home",
    component: InstructorCourseEdit,
  },
  {
    path: "/instructor/instructor_payout",
    exact: true,
    name: "Home",
    component: InstructorPayout,
  },
  {
    path: "/instructor/feedback",
    exact: true,
    name: "Home",
    component: InstructorFeedback,
  },
  {
    path: "/instructor/instructor_statements",
    exact: true,
    name: "Home",
    component: InstructorStatement,
  },
  {
    path: "/profile_view/:id",
    exact: true,
    name: "Home",
    component: InstructorProfileView,
  },
  {
    path: "/instructor/instructor_setting",
    exact: true,
    name: "Home",
    component: InstructorSetting,
  },
  {
    path: "/instructor/instructor_new_course",
    exact: true,
    name: "Home",
    component: InstructorNewCourse,
  },
  {
    path: "/student/student_dashboard",
    exact: true,
    name: "Home",
    component: StudentDashboard,
  },
  {
    path: "/student/student_courses",
    exact: true,
    name: "Home",
    component: StudentCourses,
  },
  {
    path: "/student/student_notifications",
    exact: true,
    name: "Home",
    component: StudentNotifications,
  },
  {
    path: "/student/student_certificates",
    exact: true,
    name: "Home",
    component: StudentCertificates,
  },
  {
    path: "/student/student_all_reviews",
    exact: true,
    name: "Home",
    component: StudentAllReviews,
  },
  {
    path: "/student/student_credits",
    exact: true,
    name: "Home",
    component: StudentCredits,
  },
  {
    path: "/student/student_statements",
    exact: true,
    name: "Home",
    component: StudentStatements,
  },
  {
    path: "/student/student_feedback",
    exact: true,
    name: "Home",
    component: StudentFeedback,
  },
  {
    path: "/student/student_setting",
    exact: true,
    name: "Home",
    component: StudentSetting,
  },
  {
    path: "/SafetyBusinessForm",
    exact: true,
    name: "Home",
    component: CompanyForm,
  },
  {
    path: "/becomeAnInstructor",
    exact: true,
    name: "Home",
    component: BecomeAnInstructor,
  },
  {
    path: "/courseoverview/:id",
    exact: true,
    name: "Home",
    component: Header,
  },
];


export default routes;
