import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
//for Recomndation and top category component
function RecomndationCategory() {
  const [categories, SetCategories] = useState([]);

  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    getCategories();
  }, []);
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

  const CategoryListAPICall = (CategoryID) => {
    // console.log("catgeory")
    localStorage.setItem("CategoryID", JSON.stringify(CategoryID));
    // console.log("id",CategoryID)

    history.push("/search_results");
  };
  return (
    <>
      {/* <div className="get1452">
        <h4>Get recommendations</h4>
        <p>Answer a few questions for your top picks</p>
        <button className="Get_btn" onClick="window.location.href = '#';">
          Get Started
        </button>
      </div> */}

      <div className="fcrse_3">
        <div className="cater_ttle">
          <h4>Top Categories</h4>
        </div>
        {/* {categories.map((tempCategory, index) => (
          <ul className="allcate15">
            <li>
              <a href="#" className="ct_item"> */}
        {/* <i className="uil uil-arrow"></i> */}
        {/* {tempCategory.name}
              </a>
            </li>
          </ul>
        ))} */}
        {categories.map((cv, i) => {
          return (
            <ul className="allcate15">
              <li>
                <Link
                  onClick={() => {
                    CategoryListAPICall(cv);
                  }}
                  className="ct_item"
                >
                  <i className="uil uil-arrow"></i>
                  {cv.name}
                </Link>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default RecomndationCategory;
