import React from "react";
import images from "../../images/left-imgs/img-1.jpg";
import "./instructorstyle.css";
//instructor review for instructor all review page
function InstructorAllReview() {
  return (
    <>
     <div className="sa4d25" id="instructorstyle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="st_title" style={{position:'absolute',top:'50%',left:"50%"}}>
                <i className="uil uil-star"></i>Inprocess
              </h2>
            </div>
          </div>
          </div>
          </div>
      {/* <div className="sa4d25" id="instructorstyle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="st_title">
                <i className="uil uil-star"></i> All Review
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="student_reviews">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="reviews_left">
                      <h3>My All Feedback</h3>
                      <div className="total_rating">
                        <div className="_rate001">4.6</div>
                        <div className="rating-box">
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star half-star"></span>
                        </div>
                        <div className="_rate002">All Rating</div>
                      </div>
                      <div className="_rate003">
                        <div className="_rate004">
                          <div className="progress progress1">
                            <div
                              className="progress-bar w-70"
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="rating-box">
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                          </div>
                          <div className="_rate002">70%</div>
                        </div>
                        <div className="_rate004">
                          <div className="progress progress1">
                            <div
                              className="progress-bar w-30"
                              role="progressbar"
                              aria-valuenow="30"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="rating-box">
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star empty-star"></span>
                          </div>
                          <div className="_rate002">40%</div>
                        </div>
                        <div className="_rate004">
                          <div className="progress progress1">
                            <div
                              className="progress-bar w-5"
                              role="progressbar"
                              aria-valuenow="10"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="rating-box">
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                          </div>
                          <div className="_rate002">5%</div>
                        </div>
                        <div className="_rate004">
                          <div className="progress progress1">
                            <div
                              className="progress-bar w-2"
                              role="progressbar"
                              aria-valuenow="2"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="rating-box">
                            <span className="rating-star full-star"></span>
                            <span className="rating-star full-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                          </div>
                          <div className="_rate002">1%</div>
                        </div>
                        <div className="_rate004">
                          <div className="progress progress1">
                            <div
                              className="progress-bar w-1"
                              role="progressbar"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="rating-box">
                            <span className="rating-star full-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                            <span className="rating-star empty-star"></span>
                          </div>
                          <div className="_rate002">1%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="review_right">
                      <div className="review_right_heading">
                        <h3>My All Reviews</h3>
                        <div className="review_search">
                          <input
                            className="rv_srch"
                            type="text"
                            placeholder="Search reviews..."
                          />
                          <button className="rvsrch_btn">
                            <i className="uil uil-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="review_all120">
                      <div className="review_item_course_title">
                        <a href="#">Course Title Here</a>
                      </div>
                      <div className="review_item">
                        <div className="review_usr_dt">
                          <img src={images} alt="" />
                          <div className="rv1458">
                            <h4 className="tutor_name1">John Doe</h4>
                            <span className="time_145">1 hour ago</span>
                          </div>
                        </div>
                        <div className="rating-box mt-20">
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star half-star"></span>
                        </div>
                        <p className="rvds10">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                      </div>
                    </div>
                    <div className="review_all120">
                      <div className="review_item_course_title">
                        <a href="#">Course Title Here</a>
                      </div>
                      <div className="review_item">
                        <div className="review_usr_dt">
                          <img src={images} alt="" />
                          <div className="rv1458">
                            <h4 className="tutor_name1">John Doe</h4>
                            <span className="time_145">1 hour ago</span>
                          </div>
                        </div>
                        <div className="rating-box mt-20">
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star half-star"></span>
                        </div>
                        <p className="rvds10">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                      </div>
                    </div>
                    <div className="review_all120">
                      <div className="review_item_course_title">
                        <a href="#">Course Title Here</a>
                      </div>
                      <div className="review_item">
                        <div className="review_usr_dt">
                          <img src={images} alt="" />
                          <div className="rv1458">
                            <h4 className="tutor_name1">John Doe</h4>
                            <span className="time_145">1 hour ago</span>
                          </div>
                        </div>
                        <div className="rating-box mt-20">
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star full-star"></span>
                          <span className="rating-star half-star"></span>
                        </div>
                        <p className="rvds10">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. className aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos
                          eros ac, sagittis orci."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default InstructorAllReview;
