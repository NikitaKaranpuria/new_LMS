import React from "react";
import Accordian from "./Accordian";
import { useState, useEffect } from "react";
import RatingReviewAccordian from "./RatingReviewAccordian";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import StudentFeedback from "../student/StudentFeedback";
import $ from 'jquery';
// result filter and sort component component for search result page
function SearchResultFilter() {
  //for authentication
  // let history = useHistory();
  // useEffect(async () => {
  //   if (!localStorage.getItem("LMS_Token")) {
  //     history.push(`/sign_in`);
  //   }
  // }, []);
  const [course, setCourse] = useState([])
  const [level, setLevel] = useState([])
  const [language, setLanguage] = useState([])
  const [price, setPrice] = useState([])
  const [features, setFeatures] = useState([])
  const [videoDuration, setVideoDuration] = useState([])
  const [subtitle, setSubtitle] = useState([])
  const [dropdown, setdropdown] = useState(false)
  const [sortValue, SetSortValue] = useState('')
  const [dropdownValue, setdropdownValue] = useState([
    "Most Relevant",
    "Most Reviewed",
    "Highest Rated",
    "Newest",
    "Lowest Price",
    "Highest Price",
  ])




  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);

    }
    Topic()
    Level()
    Language()
    Price()
    Features()
    VideoDuration()
    Subtitle()
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
       //console.log(response, "list of course")
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
       //console.log(response, "list of subtitle")
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
       //console.log(response, "list of language")
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
       //console.log(response, "list of price")
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
       //console.log(response, "list of features")
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
       //console.log(response, "list of duration")
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
       //console.log(response, "list of subtitle")
        setSubtitle(response.data);

      });
  };
  const showDropdown = () => {
    console.log("dropdown")
    setdropdown(!dropdown)
  }

  const showSortValue = (sortdata) => {
    SetSortValue(sortdata);
    setdropdown(!dropdown)
  }
  //#endregion
  return (
    <>
      <div className="col-lg-3 col-md-4">
        <div className="section3125 hstry142">
          <div className="result_stitles">
            <div className="rs6t_title">Filters</div>
            <div className="filter_selector">
              <div className="ui inline dropdown flt145">

                <div className="text" onClick={showDropdown} id="sort">{sortValue ? sortValue : 'Sort'}</div>
                <i className="dropdown icon"></i>
                <div className="menu transition visible" id="dropdownsort" >
                  {
                    dropdown ? <>
                      {
                        dropdownValue.map((cv, i) => {
                          return <div className="item" onClick={() => showSortValue(cv)} >{cv}</div>
                        })
                      }



                    </> : ""}
                </div>
                {/* <div className="item channel_item">Development</div>
                    <div className="item channel_item">Business</div>
                    <div className="item channel_item">Finance & Accounting</div>
                    <div className="item channel_item">IT & Software</div>
                    <div className="item channel_item">Office Productivity</div>
                    <div className="item channel_item">Personal Development</div>
                    <div className="item channel_item">Design</div>
                    <div className="item channel_item">Marketing</div>
                    <div className="item channel_item">Lifestyle</div>
                    <div className="item channel_item">Photography</div>
                    <div className="item channel_item">Health & Fitness</div>
                    <div className="item channel_item">Music</div>
                    <div className="item channel_item">Teaching & Academics</div>
                  </> : '' */}
                {/* } */}

              </div>
            </div>
          </div>
          <div className="tb_145">
            <div className="panel-group accordion" id="accordionfilter">
              <div className="panel panel-default">
                <Accordian Heading="Topic" Acodiandata={course} Body="listoftopic" />
                <Accordian Heading="Level" Acodiandata={level} Body="listoflevel" />
                <Accordian Heading="Language" Acodiandata={language} Body="listlanguage" />
                <Accordian Heading="Price" Acodiandata={price} Body="listofprice" />
                <Accordian Heading="Features" Acodiandata={features} Body="listoffeatures" />
                <Accordian Heading="Video Duration" Acodiandata={videoDuration} Body="listofduration" />
                <Accordian Heading="Subtitles" Acodiandata={subtitle} Body="listofsubtitles" />
                {/* <RatingReviewAccordian Heading="Rating" Body="countrateing" /> */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
export default SearchResultFilter;
