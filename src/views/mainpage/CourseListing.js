import React from "react";
// import SearchResultFilter from "./SearchResultFilter"; // filter and sort component for search result page
// import GetSearchResult from "./GetSearchResult"; //get search result component for search result page
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import Accordian from "./Accordian";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useState, useEffect } from "react";
// import './collapse'
//search result page
function CourseListing() {
  const [isOpen, SetIsOpen] = useState(false);
  const [colased, Setcollased] = useState(true);
  const { Checked, setChecked } = useState([]);
  const [Acodiandata, setAccordianData] = useState({});

  const [isOpenLevel, SetIsOpenLevel] = useState(false);
  const [colasedLevel, SetcollasedLevel] = useState(true);

  const [isOpenLanguage, SetIsOpenLanguage] = useState(false);
  const [colasedLanguage, SetcollasedLanguage] = useState(true);

  const [isOpenPrice, SetIsOpenPrice] = useState(false);
  const [colasedPrice, SetcollasedPrice] = useState(true);

  const [isOpenDuration, SetIsOpenDuration] = useState(false);
  const [colasedDuration, SetcollasedDuration] = useState(true);

  const [isOpenFeature, SetIsOpenFeature] = useState(false);
  const [colasedFeature, SetcollasedFeature] = useState(true);

  const [isOpenSubtitle, SetIsOpenSubtitle] = useState(false);
  const [colasedSubtitle, SetcollasedSubtitle] = useState(true);
  const [savecourse, setSaveCourse] = useState([]);
  const [reportReason, setReportCourse] = useState([{ reason: "" }]);


  const mycollapsed = () => {
    SetIsOpen(!isOpen);
    Setcollased(!colased);
  };
  const mycollapsedLevel = () => {
    SetIsOpenLevel(!isOpenLevel);
    SetcollasedLevel(!colasedLevel);
  };

  const mycollapsedLanguage = () => {
    SetIsOpenLanguage(!isOpenLanguage);
    SetcollasedLanguage(!colasedLanguage);
  };

  const mycollapsedPrice = () => {
    SetIsOpenPrice(!isOpenPrice);
    SetcollasedPrice(!colasedPrice);
  };

  const mycollapsedDuration = () => {
    SetIsOpenDuration(!isOpenDuration);
    SetcollasedDuration(!colasedDuration);
  };

  const mycollapsedFeature = () => {
    SetIsOpenFeature(!isOpenFeature);
    SetcollasedFeature(!colasedFeature);
  };
  const mycollapsedSubtitle = () => {
    SetIsOpenSubtitle(!isOpenSubtitle);
    SetcollasedSubtitle(!colasedSubtitle);
  };

  //for authentication
  const [course, setCourse] = useState([]);
  const [topic, setTopic] = useState([]);
  const [level, setLevel] = useState([]);
  const [language, setLanguage] = useState([]);
  const [price, setPrice] = useState([]);
  const [features, setFeatures] = useState([]);
  const [videoDuration, setVideoDuration] = useState([]);
  const [subtitle, setSubtitle] = useState([]);
  const [allCourselist, setallCourseList] = useState([]);
  const [category, setCategory] = useState([]);
  const [dropdown, setdropdown] = useState(false);
  const [sortValue, SetSortValue] = useState("");
  const [dropdownValue, setdropdownValue] = useState([
    "Most Relevant",
    "Most Reviewed",
    "Highest Rated",
    "Newest",
    "Lowest Price",
    "Highest Price",
  ]);

  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      //localStorage.setItem(
      //   "LMS_Token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNX0sImlhdCI6MTYxNTU0ODYzNn0.LQQN1nw5rAS-SpWIv9h5kinLdlb0f849g0yDFIweKtE"
      // );
      history.push(`/sign_in`);
    }
    Topic();
    Level();
    Language();
    Price();
    Features();
    VideoDuration();
    Subtitle();
    AllCourseList();
  }, []);
  // #region filter methods
  const Topic = async () => {
    await axios
      .get(`${BaseUrl}forentend/listoftopic`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setCourse(response.data);
      });
  };
  const Level = async () => {
    await axios
      .get(`${BaseUrl}forentend/listoflevel`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setLevel(response.data);
      });
  };
  const Language = async () => {
    await axios
      .get(`${BaseUrl}forentend/listlanguage`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setLanguage(response.data);
      });
  };
  const Price = async () => {
    await axios
      .get(`${BaseUrl}forentend/listofprice`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setPrice(response.data);
      });
  };
  const Features = async () => {
    await axios
      .get(`${BaseUrl}forentend/listoffeatures`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setFeatures(response.data);
      });
  };
  const VideoDuration = async () => {
    await axios
      .get(`${BaseUrl}forentend/listofduration`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setVideoDuration(response.data);
      });
  };
  const Subtitle = async () => {
    await axios
      .get(`${BaseUrl}forentend/listofsubtitles`, {
        method: "GET",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setSubtitle(response.data);
      });
  };
  const showDropdown = () => {
    setdropdown(!dropdown);
  };

  const showSortValue = (sortdata) => {
    SetSortValue(sortdata);
    setdropdown(!dropdown);
  };
  const getCourseDetail = (id) => {
    history.push(`/course_detail/${id}`);
  };

  const addToCart = (id) => {
    history.push(`/course_detail/${id}`);
  };

  const AllCourseList = async () => {
    if (localStorage.getItem("CategoryID")) {

      const categoryid = JSON.parse(localStorage.getItem("CategoryID"));
      await axios
        .get(
          `${BaseUrl}forentend/findbycategory/${categoryid.id}`,
          {
            method: "GET",
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
              "Content-Type": "application/x-www-form-urlencoded",
              auth: localStorage.getItem("LMS_Token"),
            },
          }
        )
        .then(function (response) {
          setallCourseList(response.data);
        });
      localStorage.removeItem("CategoryID");
    } else {
      await axios
        .post(
          `${BaseUrl}forentend/filtercourse`,
          {
            method: "POST",
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
              "Content-Type": "application/x-www-form-urlencoded",
              auth: localStorage.getItem("LMS_Token"),
            },
          }
        )
        .then(function (response) {
          setallCourseList(response.data);
        });
    }
  };
  const handleChange = async (id) => {
    const topic_id = {
      id_topic: id,
    };
    const level_id = {
      id_level: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        topic_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };

  const handleLevelChange = async (id) => {
    const level_id = {
      id_level: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        level_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };

  const handleLanguageChange = async (id) => {
    const language_id = {
      id_language: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        language_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };
  const handlePriceChange = async (id) => {
    const price_id = {
      id_price: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        price_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };

  const handleFeatureChange = async (id) => {
    const feature_id = {
      id_features: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        feature_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };
  const handleDurationChange = async (id) => {
    const duration_id = {
      id_duration: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        duration_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };
  const handleSubtitleChange = async (id) => {
    const subtitle_id = {
      id_subtitles: id,
    };
    await axios
      .post(
        `${BaseUrl}forentend/filtercourse`,
        subtitle_id,
        {
          method: "POST",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        setallCourseList(response.data);
      });
  };
  //#endregion
  //#region save ,report course
  const SaveCourse = async (ID) => {
    let urlencoded = new URLSearchParams()
    urlencoded.append('course_id', ID)
    await axios
      .post(`${BaseUrl}foretend/savecourse`, urlencoded, {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          // "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setSaveCourse(response.data.data);
      });
  };

  const ReportCourse = async (ID) => {
    let urlencoded = new URLSearchParams()
    urlencoded.append('course_id', ID)
    urlencoded.append('reason', "")

    await axios
      .post(`${BaseUrl}foretend/reportcourse`, urlencoded, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setReportCourse(response.data.data);
      });
  };
  //#endregion

  return (
    <>
      <div class="_215b15">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="title125">
                <div class="titleleft">
                  <div class="ttl121">
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Course Results
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <div class="titleright">
                  <div class="explore_search">
                    <div class="ui search focus">
                      <div class="ui left icon input swdh11 swdh15">
                        <input
                          class="prompt srch_explore"
                          type="text"
                          placeholder="Search"
                        />
                        <i class="uil uil-search-alt icon icon2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="title126">
                <h2>Course Results</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sa4d25 mb4d25">
        <div class="container">
          <div class="row justify-content-between">
            <div className="col-lg-3 col-md-4">
              <div className="section3125 hstry142">
                <div className="result_stitles">
                  <div className="rs6t_title">Filters</div>
                  <div className="filter_selector">
                    <div className="ui inline dropdown flt145">
                      <div className="text" onClick={showDropdown} id="sort">
                        {sortValue ? sortValue : "Sort"}
                      </div>
                      <i className="dropdown icon"></i>
                      <div
                        className="menu transition visible"
                        id="dropdownsort"
                      >
                        {dropdown ? (
                          <>
                            {dropdownValue.map((cv, i) => {
                              return (
                                <div
                                  className="item"
                                  onClick={() => showSortValue(cv)}
                                >
                                  {cv}
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tb_145">
                  <div className="panel-group accordion" id="accordionfilter">
                    <div class="panel-heading" id="headingOne">
                      <div class="panel-title10">
                        <a
                          class={colased ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          onClick={mycollapsed}
                        >
                          Topic
                        </a>
                      </div>
                    </div>
                    <div
                      id="collapseOne"
                      class="panel-collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionfilter"
                    >
                      {isOpen && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {course.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() => handleChange(cv.id)}
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingTwo">
                      <div class="panel-title10">
                        <a
                          class={colasedLevel ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          onClick={mycollapsedLevel}
                        >
                          Level
                        </a>
                      </div>
                    </div>
                    <div
                      id="collapseTwo"
                      class="panel-collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionfilter"
                    >
                      {isOpenLevel && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {level.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handleLevelChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingThree">
                      <div class="panel-title10">
                        <a
                          class={colasedLanguage ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                          onClick={mycollapsedLanguage}
                        >
                          Language
                        </a>
                      </div>
                    </div>
                    <div id="collapseThree">
                      {isOpenLanguage && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {language.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handleLanguageChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingFour">
                      <div class="panel-title10">
                        <a
                          class={colasedPrice ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                          onClick={mycollapsedPrice}
                        >
                          Price
                        </a>
                      </div>
                    </div>
                    <div id="collapseFour">
                      {isOpenPrice && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {price.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handlePriceChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingFive">
                      <div class="panel-title10">
                        <a
                          class={colasedFeature ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                          onClick={mycollapsedFeature}
                        >
                          Features{" "}
                        </a>
                      </div>
                    </div>
                    <div id="collapseFive">
                      {isOpenFeature && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {features.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handleFeatureChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingSix">
                      <div class="panel-title10">
                        <a
                          class={colasedDuration ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                          onClick={mycollapsedDuration}
                        >
                          Video Duration
                        </a>
                      </div>
                    </div>
                    <div id="collapseSix">
                      {isOpenDuration && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {videoDuration.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handleDurationChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="panel-heading" id="headingSeven">
                      <div class="panel-title10">
                        <a
                          class={colasedSubtitle ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-target="#collapseSeven"
                          aria-expanded="false"
                          aria-controls="collapseSeven"
                          onClick={mycollapsedSubtitle}
                        >
                          Subtitle
                        </a>
                      </div>
                    </div>
                    <div id="collapseSeven">
                      {isOpenSubtitle && (
                        <div class="panel-body ">
                          <div class="ui form">
                            {subtitle.map((cv, id) => {
                              return (
                                <div class="grouped fields" key={id}>
                                  <div class="ui form checkbox_sign">
                                    <div class="inline field">
                                      <div class="ui checkbox mncheck">
                                        <input
                                          type="checkbox"
                                          // checked={
                                          //   Checked.indexOf(cv.name) === -1 ? false : true
                                          // }
                                          checked={Checked}
                                          value={cv.name}
                                          onChange={() =>
                                            handleSubtitleChange(cv.id)
                                          }
                                        />
                                        <label>
                                          {cv.name}{" "}
                                          <span class="filter__counter">
                                            ({cv.Total_course})
                                          </span>{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-9 col-md-8">
              <div class="col-md-12">
                <h4 class="mhs_title">5 Results</h4>
                {allCourselist.map((allList, index) => (
                  <div class="fcrse_2" key={index}>
                    <a href={`/course_detail/${allList.id}`} class="hf_img">
                      {/* <img src="images/courses/img-1.jpg" alt="" /> */}
                      <img src={allList.thumbnail} alt="" />

                      <div class="course-overlay">
                        <div class="badge_seller">Bestseller</div>
                        <div class="crse_reviews">
                          <i class="uil uil-star"></i>
                          {allList.rate}
                        </div>
                        <span class="play_btn1">
                          <i class="uil uil-play"></i>
                        </span>
                        <div class="crse_timer">{allList.duration}</div>
                      </div>
                    </a>
                    <div class="hs_content">
                      <a href={`/course_detail/${allList.id}`}>
                        <div class="vdtodt">
                          <div class="">{allList.view} views</div>
                          <div class="" style={{ marginLeft: "55px", marginTop: "-16px" }}>{allList.created_at}</div>
                          <div class="eps_dots eps_dots10 more_dropdown">
                            <a href="#">
                              <i class="uil uil-ellipsis-v"></i>
                            </a>
                            <div class="dropdown-content">
                              {/* <span>
                              <i class="uil uil-share-alt"></i>Share
                            </span> */}
                              <span>
                                <i class="uil uil-heart" onClick={() => SaveCourse(allList.id)}></i>Save
                              </span>
                              {/* <span>
                            <i class="uil uil-ban"></i>Not Interested
                          </span> */}
                              <span>
                                <i class="uil uil-windsock" onClick={() => ReportCourse(allList.id)}></i>Report
                              </span>
                            </div>
                          </div>


                        </div>
                        {/* <a href="course_detail_view.html" class="crse14s title900">Courset title goes here</a> */}
                        <a
                          href={`/course_detail/${allList.id}`}
                          class="crse14s title900"
                        >
                          {allList.title}
                        </a>

                        <a href="#" class="crse-cate">
                          {/* language | Subtitle */}
                          {allList.language_name} | {allList.subtitles_name}
                        </a>
                        <div class="auth1lnkprce">
                          <p class="cr1fot">
                            By <a href="#">{allList.first_name}</a>
                          </p>
                          <div class="prce142">${allList.price}</div>
                          <button class="shrt-cart-allListbtn" title="cart">
                            <i class="uil uil-shopping-cart-alt"></i>
                          </button>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseListing;
