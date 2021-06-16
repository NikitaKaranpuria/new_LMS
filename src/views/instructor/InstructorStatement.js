import React from "react";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./instructorstyle.css";
import './instructorCourseComponent/Discount.css'
import ReactPaginate from 'react-paginate';
//instructor statement component for instructor statemant page
function InstrctorStatement(params) {
  const[instructorStatement,setInstructorStatement]=useState([])
  const [postsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  const [pagination,setpagination]=useState(0);
  
  const [pageCount, setPageCount] = useState(0)
  const [Tammount, setTammount] = useState(0)
  const [Tfees, setTfees] = useState(0)
  let history = useHistory();
 
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
   
    RecieveInstructorStatmentData()
  },  []);
  useEffect(() => {
  // RecieveInstructorStatmentData()
  setpagination(1);
  allMounthApi()
  },  [offset]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
   setOffset(selectedPage + 1)

};
  const RecieveInstructorStatmentData = async () => {
    document.getElementById("b1").className = "more_items_14";
    document.getElementById("b2").className = "more_items_14 active";
    // setpagination(0);
    await axios
        .get(`${BaseUrl}forentend/instructer_statement_currentmonth`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then(function (response) {
          // setpagination(0);
          const data = response.data;
          let fee=0;
          let amo=0;
          data.map((e,i)=>{
            amo=amo+e.Amount;
            fee=fee+e.fees;
            if(i==data.length-1){
              setTammount(amo);
              setTfees(fee);
            }
          })
          // const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)
   
     // For displaying Data
     setInstructorStatement(data)
    //  setPageCount(Math.ceil(data.length / postsPerPage))
    //       console.log(response.data,'current');
         });
    };
 
    const allMounthApi=async()=>{
      document.getElementById("b2").className = "more_items_14";
      document.getElementById("b1").className = "more_items_14 active";
      // setpagination(1);
      await axios
      .get(`${BaseUrl}forentend/instructer_statement`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        const data = response.data;
        const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)
 
   // For displaying Data
   setInstructorStatement(slice)
   setPageCount(Math.ceil(data.length / postsPerPage))
      });
  };
  const renderpagination = () => {
    if (pagination==1) {
      return <ReactPaginate
      previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}/>;
    }
    else if(pagination==0) {
      return <h>0</h>;
    }
  }
    
  return (
    <>
      <div className="sa4d25" id="instructorstyle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="st_title">
                <i className="uil uil-file-alt"></i> Statements
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="top_countries mt-30">
                <div className="top_countries_title">
                  <h2>Earnings</h2>
                </div>
                <div className="statement_content">
                  <p className="tt-body">
                    Your sales earnings over the last 30 days
                  </p>
                  <table className="statement-summary__table">
                    <thead>
                      <tr>
                        <th>
                          <p className="t-heading">My funds</p>
                        </th>
                        <th>
                          <p className="t-heading">Earnings</p>
                        </th>
                        <th>
                          <p className="t-heading">SafetyTek Fees</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="statement-summary__funds">
                          <p className="js-earnings__instructor-funds-wrapper">
                            <span className=""></span>
                            <span className="js-earnngs__instructor-funds t-currency">
                              ${parseInt(Tammount-Tfees)}
                            </span>
                          </p>
                        </td>
                        <td className="statement-summary__earnings">
                          <p className="js-earnings__earnings-wrapper">
                            <span className="tt__earning">+</span>
                            <span className="js-earnings__earnings t-currency">
                              ${parseInt(Tammount)}
                            </span>
                          </p>
                        </td>
                        <td className="statement-summary__fees">
                          <p className="js-earnings__fees-wrapper">
                            <span className="tt__earning">-</span>
                            <span className="js-earnings__fees t-currency">
                              ${parseInt(Tfees)}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-5">
              <div className="top_countries mt-30">
                <div className="top_countries_title">
                  <h2>View Invoices</h2>
                </div>
                <div className="statement_invoice_content">
                  <div className="date_selector mt-0">
                    <div className="ui selection dropdown skills-search vchrt-dropdown invoice-dropdown">
                      <input name="date" type="hidden" value="default" />
                      <i className="dropdown icon d-icon"></i>
                      <div className="text">Monthly Invoices</div>
                      <div className="menu">
                        <div className="item" data-value="0">
                          March 2021
                        </div>
                        <div className="item" data-value="1">
                          March 2021
                        </div>
                      </div>
                    </div>
                    <button className="st_download_btn">
                      <i className="uil uil-download-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-lg-12 col-md-12">
              <ul className="more_options_tt">
                <li>
                  <button className="more_items_14 active" id="b1" onClick={RecieveInstructorStatmentData}>This Month</button>
                </li>
                <li>
                  <button className="more_items_14"  id="b2" onClick={allMounthApi}>All Month</button>
                </li>
                {/* <li>
                  <div className="explore_search">
                    <div className="ui search focus">
                      <div className="ui left icon input swdh11 swdh15">
                        <input
                          className="prompt srch_explore"
                          type="text"
                          placeholder="Document Number"
                        />
                        <i className="uil uil-search-alt icon icon8"></i>
                      </div>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="table-responsive mt-30">
                <table className="table ucp-table earning__table">
                  <thead className="thead-s">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">Category</th>
                      <th scope="col">Title</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Fees</th>
                      {/* <th scope="col">Invoice</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      instructorStatement.map((cv,i)=>{
                        if(pagination==0){
                          setTammount(Tammount+cv.Amount);
                          setTfees(Tfees+cv.fees);
                        }
                        return <tr>
                        <td>{cv.created_at}</td>
                        <td>{cv.id_oders}</td>
                        <td> {cv.Category}</td>
                        <td>{cv.course_title}</td>
                        <td>${cv.Amount}</td>
                        <td>-${cv.fees}</td>
                        {/* <td>
                          <a href="#">View</a>
                        </td> */}
                      </tr>
                      })
                    }
                    
                                      </tbody>
                </table>
                {renderpagination()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstrctorStatement;
