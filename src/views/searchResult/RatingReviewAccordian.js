import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Accordian({ Heading, Body }) {
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      // localStorage.setItem(
      //   "LMS_Token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNX0sImlhdCI6MTYxNTU0ODYzNn0.LQQN1nw5rAS-SpWIv9h5kinLdlb0f849g0yDFIweKtE"
      // );
      history.push(`/sign_in`);
    }
  }, []);
  const [isOpen, SetIsOpen] = useState(false);
  const [colased, Setcollased] = useState(true);
  const mycollapsed = () => {
    SetIsOpen(!isOpen);
    Setcollased(!colased);
  };
  const [rating, setRating] = useState([]);
  const RecieveRating = async () => {
    await axios
      .get(`${BaseUrl}${Body}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setRating(response.data);
        // console.log(response.data);
      });
  };

  useEffect(() => {
    RecieveRating();
  }, []);
  return (
    <>
      <div class="panel-heading">
        <div class="panel-title10">
          <Link
            class={colased ? "collapsed" : ""}
            aria-expanded="false"
            aria-controls="collapseTwo"
            onClick={mycollapsed}
          >
            {Heading}
          </Link>
        </div>
      </div>
      <div id="collapseOne">
        {isOpen && (
          <div class="panel-body">
            <div class="ui form">
              {rating.map((cv, id) => {
                return (
                  <div class="grouped fields">
                    <div class="ui form checkbox_sign">
                      <div class="inline field">
                        <div class="ui checkbox mncheck">
                          <input type="checkbox" tabindex="0" class="hidden" />
                          <label class="rating_filter">
                            <i class="uil uil-star"></i>
                            <i class="uil uil-star"></i>
                            <i class="uil uil-star"></i>
                            <i class="uil uil-star"></i>
                            <i class="uil uil-star"></i>
                            {cv} &amp; up
                            <span class="filter__counter">(5000)</span>
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
    </>
  );
}

export default Accordian;
