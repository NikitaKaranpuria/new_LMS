import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./studentstyle.css";
import { useHistory } from "react-router-dom";
import CryptoJS  from "crypto-js";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
function StudentCertificates(params) {
  const [courselist, Setcourselist] = useState([])
  let histrory = useHistory()
  const RecieveCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/mycertificate/`, {
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
  useEffect(() => {
    RecieveCourse();
  }, []);
  return (
    <div className="sa4d25">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-award"></i> My Certificates
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mt-10">
              <div className="table-cerificate">
                <div className="table-responsive">
                  <table className="table ucp-table" id="content-table">
                    <thead className="thead-s">
                      <tr>
                        <th scope="col">Item No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Course Completed Date</th>
                        <th scope="col">Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      courselist.map((cv, i) => {
                        return (<>
                      <tr>
                        <td className="">{i+1}</td>
                        <td className="">{cv.Title}</td>

                        <td className="">{cv.CourseCompletedDate}</td>
                        <td className="">View</td>
                      </tr>
                      </>)
                      })
                    }
                      {/* <tr>
                        <td className="">1</td>
                        <td className="">Course Title</td>

                        <td className="">6 April 2019</td>
                        <td className="">View</td>
                      </tr>
                      <tr>
                        <td className="">1</td>
                        <td className="">Course Title</td>

                        <td className="">6 April 2019</td>
                        <td className="">View</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCertificates;
