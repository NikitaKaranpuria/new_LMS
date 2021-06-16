import React from "react";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./studentstyle.css";
import '../instructor/instructorCourseComponent/Discount.css'
import ReactPaginate from 'react-paginate';
//instructor statement component for instructor statemant page
function InstrctorStatement(params) {
  const[instructorStatement,setInstructorStatement]=useState([])
  const [postsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  
  const [pageCount, setPageCount] = useState(0)
  let history = useHistory();
 
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
   
    // RecieveInstructorStatmentData()
  },  []);
  useEffect(() => {
  allMounthApi()
  },  [offset]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
   setOffset(selectedPage + 1)

};
  const RecieveInstructorStatmentData = async () => {
    document.getElementById("b1").className = "more_items_14";
    // document.getElementById("b2").className = "more_items_14 active";
    await axios
        .get(`${BaseUrl}forentend/student_statement_currentmonth`, {
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
          // console.log(response.data,'current');
        });
    };
 
    const allMounthApi=async()=>{
      document.getElementById("b2").className = "more_items_14";
      // document.getElementById("b1").className = "more_items_14 active";
      await axios
      .get(`${BaseUrl}forentend/student_statement`, {
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
        
            <div className="col-lg-12 col-md-12">
              <ul className="more_options_tt">
                {/* <li>
                  <button className="more_items_14 active" id="b1" onClick={RecieveInstructorStatmentData}>This Month</button>
                </li> */}
                <li>
                  <button className="more_items_14" id="b2" onClick={allMounthApi}>All Month</button>
                </li>
                {/* <li>
                  <div className="explore_search">
                    <div className="ui search focus">
                      <div className="ui left icon input swdh11 swdh15">
                        <input1111111111111
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
                      {/* <th scope="col">View</th> */}
                    
                     
                    </tr>
                  </thead>
                  <tbody>
                    {
                      instructorStatement.map((cv,i)=>{
                        return <tr>
                        <td>{cv.created_at}</td>
                         <td>{cv.id}</td>
                        <td><ul style={{listStyleType:'circle'}}>{cv.category.map((temp,i)=>{
                          return <li>{temp}</li>
                        })}</ul></td>
                        <td><ul style={{listStyleType:'circle'}}>{cv.course.map((temp,i)=>{
                          return  <li>
                                   { temp}
                            </li>
                          
                        })}</ul></td>
                        <td>${cv.paid_amount}</td>
                    
                        {/* <td>
                          <a href="#">View</a>
                        </td> */}
                      </tr>
                      })
                    }
                    
                                      </tbody>
                </table>
                <ReactPaginate
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
    activeClassName={"active"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstrctorStatement;
