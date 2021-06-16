import React from "react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
function Step1() {
return (
    <>
      <div className="tab-from-content">
        <div className="title-icon">
          <h3 className="title">
            <i className="uil uil-info-circle"></i>General Information
          </h3>
        </div>

        <div className="course__form">
          <div className="general_info10">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="ui search focus mt-30 lbel25">
                  <label>Course Title*</label>
                  <div className="ui left icon input swdh19">
                    <input
                      className="prompt srch_explore"
                      type="text"
                      placeholder="Insert your course title."
                      name="title"
                      data-purpose="edit-course-title"
                      maxlength="60"
                      id="main[title]"
                      value=""
                    />
                    <div className="badge_num">60</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="ui search focus mt-30 lbel25">
                  <label>Course Subtitle*</label>
                  <div className="ui left icon input swdh19">
                    <input
                      className="prompt srch_explore"
                      type="text"
                      placeholder="Insert your course Subtitle."
                      name="subtitle"
                      data-purpose="edit-course-title"
                      maxLength="60"
                      id="sub[title]"
                      value=""
                    />
                    <div className="badge_num2">120</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="course_des_textarea mt-30 lbel25">
                  <label>Course Description*</label>
                  <div className="course_des_bg">
                    <ul className="course_des_ttle">
                      <li>
                        <Link to="#">
                          <i className="uil uil-bold"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-italic"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-list-ul"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-left-to-right-text-direction"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-right-to-left-text-direction"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-list-ui-alt"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-link"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-text-size"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="uil uil-text"></i>
                        </Link>
                      </li>
                    </ul>
                    <div className="textarea_dt">
                      <div className="ui form swdh339">
                        <div className="field">
                          <textarea
                            rows="5"
                            name="description"
                            id="id_course_description"
                            placeholder="Insert your course description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="mt-30 lbel25">
                  <label>Language*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Language</option>
                  <option value="1">English</option>
                  <option value="2">Español</option>
                  <option value="3">Português</option>
                  <option value="4">日本語</option>
                  <option value="5">Deutsch</option>
                  <option value="6">Français</option>
                  <option value="7">Türkçe</option>
                  <option value="8">हिन्दी</option>
                  <option value="9">Italiano</option>
                  <option value="10">Polski</option>
                  <option value="11">ภาษาไทย</option>
                  <option value="12">Română</option>
                  <option value="13">Telugu</option>
                  <option value="14">मराठी</option>
                  <option value="15">ਪੰਜਾਬੀ</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="mt-30 lbel25">
                  <label>Course Category*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Category</option>
                  <option value="1">Development</option>
                  <option value="2">Business</option>
                  <option value="3">Finance & Accounting</option>
                  <option value="4">IT & Software</option>
                  <option value="5">Office Productivity</option>
                  <option value="6">Personal Development</option>
                  <option value="7">Design</option>
                  <option value="8">Marketing</option>
                  <option value="9">Lifestyle</option>
                  <option value="10">Photography</option>
                  <option value="11">Health & Fitness</option>
                  <option value="12">Music</option>
                  <option value="13">Teaching & Academics</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="mt-30 lbel25">
                  <label>Select Topic*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Topic</option>
                  <option value="1">Javascript</option>
                  <option value="2">Angular</option>
                  <option value="3">React</option>
                  <option value="4">CSS</option>
                  <option value="5">PHP</option>
                  <option value="6">Node.Js</option>
                  <option value="7">WordPress</option>
                  <option value="8">Vue JS</option>
                  <option value="9">Shopify</option>
                  <option value="10">Magento</option>
                  <option value="11">Open Cart </option>
                </select>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="mt-30 lbel25">
                  <label>Total Course Duration*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Duration</option>
                  <option value="1">0-2 Hours</option>
                  <option value="2">3-6 Hours</option>
                  <option value="3">7-16 Hours</option>
                  <option value="4">17+ Hours</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="mt-30 lbel25">
                  <label>Features*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Features</option>
                  <option value="1">Features 1</option>
                  <option value="2">Features 2</option>
                  <option value="3">Features 3</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="mt-30 lbel25">
                  <label>Level*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select Level</option>
                  <option value="1">Beginner</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Expert</option>
                </select>
              </div>
            </div>
          </div>
          <div className="price_course">
            <div className="row">
              <div className="col-lg-12">
                <div className="price_title">
                  <h4>
                    <i className="uil uil-dollar-sign-alt"></i>Pricing
                  </h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="mt-30 lbel25">
                  <label>Currency*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">USD</option>
                  <option value="1">USD</option>
                  <option value="2">CAD</option>
                  <option value="3">BRL</option>
                  <option value="4">EUR</option>
                  <option value="5">GBP</option>
                  <option value="6">INR</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="mt-30 lbel25">
                  <label>Select*</label>
                </div>
                <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                  <option value="">Select</option>
                  <option value="0">Free</option>
                  <option value="1">Paid</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="mt-30 lbel25">
                  <label>Amount</label>
                </div>
                <div className="ui left icon input swdh19">
                  <input
                    className="prompt srch_explore"
                    type="text"
                    placeholder="Insert amount"
                    name="amount"
                    data-purpose="enter-amount-here"
                    maxlength="60"
                    id="amount"
                    value=""
                  />
                </div>
									<button data-direction="next" class="btn btn-default steps_btn" >Next</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step1;
