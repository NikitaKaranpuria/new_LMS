import React from "react";
// import SearchResultFilter from "./SearchResultFilter"; // filter and sort component for search result page
// import GetSearchResult from "./GetSearchResult"; //get search result component for search result page
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
// import './collapse'
//search result page
function SearchResult() {
  const focusPoint = useRef(null);
  const [topicIds, setTopicIds] = useState([]);
  const [levelid, setLevelId] = useState([]);
  const [subtitleId, setSubtitleId] = useState([]);
  const [durationId, setDurationId] = useState([]);
  const [fearureId, setFutureId] = useState([]);
  const [priceId, SetPriceId] = useState([]);
  const [languageId, setLangugeId] = useState([]);
  const [isOpen, SetIsOpen] = useState(false);
  const [colased, Setcollased] = useState(true);
  const [Checked, setChecked] = useState(0);
  const [Acodiandata, setAccordianData] = useState({});
  // const [serchtex1, setserchtex] = useState('');
  const editid = useParams();
  // if(editid.id!=undefined){
  //   setserchtex(editid.id);
  // }
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

  const [filterObject, setFilterObject] = useState();
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
  const setIsOpen = () => {
    // localStorage.removeItem('CategoryID');
    ////console.log("done done done");
  };
  useEffect(() => {
    history.listen(() => setIsOpen());
  }, [history]);
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
       //console.log(response, "list of course");
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
       //console.log(response, "list of subtitle");
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
       //console.log(response, "list of language");
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
       //console.log(response, "list of price");
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
       //console.log(response, "list of features");
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
       //console.log(response, "list of duration");
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
       //console.log(response, "list of subtitle");
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
      const filterData = {
        id_topic: topicIds,
        id_level: levelid,
        id_language: languageId,
        id_duration: durationId,
        id_features: fearureId,
        id_subtitles: subtitleId,
        id_price: priceId,
        id_category: [categoryid],
        serchtext: editid.id,
      };
      await axios
        .post(`${BaseUrl}forentend/filtercourse`, filterData, {
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then(function (response) {
         //console.log(response.data, "111");
          setallCourseList(response.data);
        });
      // localStorage.removeItem('CategoryID')
    } else {
      // await axios.get(
      //     `${BaseUrl}forentend/listcourse`,
      //     {
      //       headers: {
      //         "Access-Control-Allow-Origin": "*",
      //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      //         "Content-Type": "application/x-www-form-urlencoded",
      //         auth: localStorage.getItem("LMS_Token"),
      //       },
      //     }
      //   )
      //   .then(function (response) {
      //    //console.log(response.data, "list of category");
      //     setallCourseList(response.data);
      //   });

      const categoryid = [];
      const filterData = {
        id_topic: topicIds,
        id_level: levelid,
        id_language: languageId,
        id_duration: durationId,
        id_features: fearureId,
        id_subtitles: subtitleId,
        id_price: priceId,
        id_category: categoryid,
        serchtext: editid.id,
      };
      await axios
        .post(`${BaseUrl}forentend/filtercourse`, filterData, {
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then(function (response) {
         //console.log(response.data, "111");
          setallCourseList(response.data);
        });
    }
  };

  const handlelanguge = (id) => {
    let newArray = [...languageId, id];
   //console.log(languageId);
    if (languageId.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setLangugeId(newArray);
  };

  const handlePriceChange = (id) => {
    let newArray = [...priceId, id];
   //console.log(priceId);
    if (priceId.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    SetPriceId(newArray);
  };

  const handleFeatureChange = (id) => {
    let newArray = [...fearureId, id];
   //console.log(fearureId);
    if (fearureId.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setFutureId(newArray);
  };

  const handleDurationChange = (id) => {
    let newArray = [...durationId, id];
   //console.log(durationId);
    if (durationId.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setDurationId(newArray);
  };

  const handleSubtitleChange = (id) => {
    let newArray = [...subtitleId, id];
   //console.log(subtitleId);
    if (subtitleId.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setSubtitleId(newArray);
  };

  useEffect(async () => {
    if (localStorage.getItem("CategoryID")) {
      var categoryid = JSON.parse(localStorage.getItem("CategoryID"));
      categoryid = [categoryid];
    } else {
      var categoryid = [];
    }
    const filterData = {
      id_topic: topicIds,
      id_level: levelid,
      id_language: languageId,
      id_duration: durationId,
      id_features: fearureId,
      id_subtitles: subtitleId,
      id_price: priceId,
      sort: sortValue,
      id_category: categoryid,
      serchtext: editid.id,
    };
    await axios
      .post(`${BaseUrl}forentend/filtercourse`, filterData, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then((res) => {
       //console.log(res.data);
        setallCourseList(res.data);
      });
   //console.log(filterData, "my filterData");
  }, [
    topicIds,
    levelid,
    languageId,
    durationId,
    fearureId,
    subtitleId,
    priceId,
    sortValue,
  ]);

  function handleChange(id) {
    let newArray = [...topicIds, id];
   //console.log(topicIds);
    if (topicIds.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setTopicIds(newArray);

    //     setFilterObject((prev)=>{
    // return{
    //   ...prev,
    //   id_topic:id}})

    //    //console.log('feff4efe',filterObject)
    // const topic_id={
    //   id_topic:id
    // }
    //console.log(topic_id,'topic')
    //     await axios
    //       .post(
    //         `${BaseUrl}forentend/filtercourse`,
    //         topic_id,
    //         {
    //           method: "POST",
    //         },
    //         {
    //           headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             auth: localStorage.getItem("LMS_Token"),
    //           },
    //         }
    //       )
    //       .then(function (response) {
    //        //console.log(response.data, "listttt");
    //         setallCourseList(response.data);
    //       });
  }

  // const levefilter=async()=>{
  //   const filterData={
  //     id_topic:topicIds,
  //     id_level:levelid,
  //     id_language:languageId,
  //     id_duration:durationId,
  //     id_features:fearureId,
  //     id_subtitles:subtitleId,
  //     id_price:priceId
  //   }
  //   await axios.post(`${BaseUrl}forentend/filtercourse`,filterData, {
  //     headers: {
  //       "auth": localStorage.getItem("LMS_Token")
  //     }

  //   }).then((res)=>{
  //    //console.log(res.data)
  //     setallCourseList(res.data)
  //   })
  // //console.log(filterData,'filterData')
  // }
  const handleLevelChange = async (id) => {
    let newArray = [...levelid, id];
   //console.log(levelid);
    if (levelid.includes(id)) {
      newArray = newArray.filter((day) => day !== id);
    }
    setLevelId(newArray);
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
                          Search Results
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <div class="titleright">
                  <div class="explore_search">
                    <div class="ui search focus">
                      {/* <div class="ui left icon input swdh11 swdh15">
                        <input
                          class="prompt srch_explore"
                          type="text"
                          placeholder="Search"
                        />
                        <i class="uil uil-search-alt icon icon2"></i>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="title126">
                <h2>Search Results</h2>
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
                                          ref={focusPoint}
                                          value={cv.id}
                                          name="topic"
                                          onClick={() => handleChange(cv.id)}
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
                                          value={cv.name}
                                          name="gendcfvver"
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

                                          value={cv.name}
                                          onChange={() => {
                                            handlelanguge(cv.id);
                                          }}
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
                <h4 class="mhs_title">{allCourselist.length} Results</h4>
                {allCourselist.map((allList, index) => (
                  <div class="fcrse_2" key={index}>
                    <Link to={`/course_detail/${allList.id}`} class="hf_img">
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
                    </Link>
                    <div class="hs_content">
                      <div class="eps_dots eps_dots10 more_dropdown">
                        <a href="#">
                          <i class="uil uil-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-content">
                          <span>
                            <i class="uil uil-share-alt"></i>Share
                          </span>
                          <span>
                            <i class="uil uil-heart"></i>Save
                          </span>
                          <span>
                            <i class="uil uil-ban"></i>Not Interested
                          </span>
                          <span>
                            <i class="uil uil-windsock"></i>Report
                          </span>
                        </div>
                      </div>
                      <div class="vdtodt">
                        <span class="">{allList.view} views</span>
                        <span
                          class=""
                          style={{ marginLeft: "35px", marginTop: "-16px" }}
                        >
                          {allList.created_at}
                        </span>
                      </div>
                      {/* <a href="course_detail_view.html" class="crse14s title900">Courset title goes here</a> */}
                      <Link
                        to={`/course_detail/${allList.id}`}
                        class="crse14s title900"
                      >
                        {allList.title}
                      </Link>

                      <a href="#" class="crse-cate">
                        {/* language | Subtitle */}
                        {allList.language_name} | {allList.subtitles_name}
                      </a>
                      <div class="auth1lnkprce">
                        <p class="cr1fot">
                          By <a href="#">{allList.first_name}</a>
                        </p>
                        <div class="prce142">${allList.price}</div>
                      </div>
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
export default SearchResult;
