import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./studentstyle.css";
import { useHistory } from "react-router-dom";
import CryptoJS  from "crypto-js";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
function StudentCourses(params) {
  const [courselist, Setcourselist] = useState([])
  let histrory = useHistory()
  const RecieveCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/purchaselist`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setcourselist(response.data);
      });
  };
  const redirectionview=(courseid)=>{
    let ciphertext=CryptoJS.AES.encrypt(courseid.toString(), "asdfghjkl");
    let c_id=ciphertext.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
    histrory.push(`/courseoverview/${c_id}`)
  }
  const Redirectcategoryfilter=(id)=>{
    localStorage.removeItem('CategoryID')
    localStorage.setItem("CategoryID", JSON.stringify(id));

    histrory.push("/search_results");
  }
    useEffect(() => {
    RecieveCourse();
  }, []);
  return (
    <div className="sa4d25">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-book-alt"></i>My Courses
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="my_courses_tabs mp-30">
              <div className="table-responsive ">
                <table className="table ucp-table" id="content-table">
                  <thead className="thead-s">
                    <tr style={{textAlign:"center"}}>
                      <th scope="col">Item No.</th>
                      <th scope="col">Title</th>
                      <th scope="col">Instructor</th>
                      <th scope="col">Category</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Price</th>
                      <th scope="col">Purchase Date</th>
                      {/* <th scope="col">View</th> */}
                      {/* <th scope="col">Actions</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {
                      courselist.map((cv, i) => {
                        return (<>
                          <tr>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center" onClick={()=>redirectionview(cv.id)} style={{cursor:'pointer',color:'blue'}} >{cv.course_title}</td>
                            <td className="text-center">
                              <Link to={`/profile_view/${cv.instucter_id}`}>{cv.Instructor}</Link>
                            </td>
                            <td className="text-center" onClick={()=>Redirectcategoryfilter(cv.id_category)} style={{cursor:'pointer',color:'blue'}}>{cv.Category}</td>
                            <td className="text-center">
                              <b className="course_active">{cv.Duration}</b>
                            </td>
                            <td className="text-center">
                              ${cv.course_price}
                            </td>
                            <td className="text-center">
                              {cv.Purchase_Date}
                            </td>
                            {/* <td onClick={()=>redirectionview(cv.id)} style={{cursor:'pointer'}}>
                           
                                <i className="uil uil-eye-alt">view</i>
                           
                            </td> */}
                            {/* <td>
                              <Link to="#" title="Delete" className="gray-s">
                                <i className="uil uil-trash-alt"></i>
                              </Link>
                            </td> */}

                          </tr>
                        </>)
                      })
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
