import React from "react";
import reviewimage from "../../images/left-imgs/img-1.jpg";
import { Link } from "react-router-dom";

//Review Tab component for course detail page
function ReviewTab() {
  return (
    <>
   
      <p style={{fontSize:"18px",marginTop:"20px",marginBottom:"15px"}}>No review Available</p>
   

      {/* <div className="student_reviews">
        <div className="row">
          <div className="col-lg-5">
            <div className="reviews_left">
              <h3>Feedback Summary</h3>
              <div className="total_rating">
                <div className="_rate001">4.6</div>
                <div className="rating-box">
                  <span className="rating-star full-star"></span>
                  <span className="rating-star full-star"></span>
                  <span className="rating-star full-star"></span>
                  <span className="rating-star full-star"></span>
                  <span className="rating-star half-star"></span>
                </div>
                <div className="_rate002">Course Rating</div>
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
                <h3>Reviews</h3>
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
              <div className="review_item">
                <div className="review_usr_dt">
                  <img src={reviewimage} alt="" />
                  <div className="rv1458">
                    <h4 className="tutor_name1">John Doe</h4>
                    <span className="time_145">2 hour ago</span>
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
                  Nam gravida elit a velit rutrum, eget dapibus ex elementum.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Fusce lacinia, nunc sit amet tincidunt venenatis.
                </p>
                <div className="rpt100">
                  <span>Was this review helpful?</span>
                  <div className="radio--group-inline-container">
                    <div className="radio-item">
                      <input id="radio-1" name="radio" type="radio" />
                      <label for="radio-1" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-item">
                      <input id="radio-2" name="radio" type="radio" />
                      <label for="radio-2" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                  <Link to="#" className="report145">
                    Report
                  </Link>
                </div>
              </div>
              <div className="review_item">
                <div className="review_usr_dt">
                  <img src={reviewimage} alt="" />
                  <div className="rv1458">
                    <h4 className="tutor_name1">John Doe</h4>
                    <span className="time_145">2 hour ago</span>
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
                  Nam gravida elit a velit rutrum, eget dapibus ex elementum.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Fusce lacinia, nunc sit amet tincidunt venenatis.
                </p>
                <div className="rpt100">
                  <span>Was this review helpful?</span>
                  <div className="radio--group-inline-container">
                    <div className="radio-item">
                      <input id="radio-1" name="radio" type="radio" />
                      <label for="radio-1" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-item">
                      <input id="radio-2" name="radio" type="radio" />
                      <label for="radio-2" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                  <Link to="#" className="report145">
                    Report
                  </Link>
                </div>
              </div>
              <div className="review_item">
                <div className="review_usr_dt">
                  <img src={reviewimage} alt="" />
                  <div className="rv1458">
                    <h4 className="tutor_name1">John Doe</h4>
                    <span className="time_145">2 hour ago</span>
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
                  Nam gravida elit a velit rutrum, eget dapibus ex elementum.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Fusce lacinia, nunc sit amet tincidunt venenatis.
                </p>
                <div className="rpt100">
                  <span>Was this review helpful?</span>
                  <div className="radio--group-inline-container">
                    <div className="radio-item">
                      <input id="radio-1" name="radio" type="radio" />
                      <label for="radio-1" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-item">
                      <input id="radio-2" name="radio" type="radio" />
                      <label for="radio-2" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                  <Link to="#" className="report145">
                    Report
                  </Link>
                </div>
              </div>
              <div className="review_item">
                <div className="review_usr_dt">
                  <img src={reviewimage} alt="" />
                  <div className="rv1458">
                    <h4 className="tutor_name1">John Doe</h4>
                    <span className="time_145">2 hour ago</span>
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
                  Nam gravida elit a velit rutrum, eget dapibus ex elementum.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Fusce lacinia, nunc sit amet tincidunt venenatis.
                </p>
                <div className="rpt100">
                  <span>Was this review helpful?</span>
                  <div className="radio--group-inline-container">
                    <div className="radio-item">
                      <input id="radio-1" name="radio" type="radio" />
                      <label for="radio-1" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-item">
                      <input id="radio-2" name="radio" type="radio" />
                      <label for="radio-2" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                  <Link to="#" className="report145">
                    Report
                  </Link>
                </div>
              </div>
              <div className="review_item">
                <Link to="#" className="more_reviews">
                  See More Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default ReviewTab;
