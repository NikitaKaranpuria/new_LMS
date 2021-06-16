import React, { useEffect, useState } from "react";
import "./instructorstyle.css";
import BaseUrl from "../BaseUrl/BaseUrl";
import TableScrollbar from 'react-table-scrollbar';
import axios from "axios";
//instructor earnning component for instructor earning page
function InstructorEarning(params) {
  let date = new Date();
  const currentYear = date.getFullYear()
  let longMonth = date.toLocaleString('en-us', { month: 'long' });
  const [topCourseList, setTopCourseList] = useState([])
  const [instrucorDailyReport, setInstrucorDailyReport] = useState([])
  const GetCourseData = async () => {
    await axios.get(`${BaseUrl}forentend/instructer_topcourse`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setTopCourseList(response.data.data)
    });
  }
  const GetInstructorDailyErning = async () => {
    await axios.get(`${BaseUrl}forentend/instructer_deily_erning`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setInstrucorDailyReport(response.data.data)
    });
  }

  const GetInstructorallErning = async () => {
    await axios.get(`${BaseUrl}forentend/instructer_all_erning`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setInstrucorDailyReport(response.data.data)
    });
  }


  const GetInstructoroneyearErning = async () => {
    await axios.get(`${BaseUrl}forentend/instructer_oneyear_erning`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setInstrucorDailyReport(response.data.data)
    });
  }
  useEffect(() => {
    GetCourseData();
    GetInstructorDailyErning();
  }, [])
  return (
    <>
      <div className="sa4d25" id="instructorstyle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="st_title">
                <i className="uil uil-dollar-sign"></i> Earning
              </h2>
            </div>
          </div>
          <div className="row">

            {
              instrucorDailyReport.map((cv, i) => {
                if (i === instrucorDailyReport.length - 1) {
                  return <div className="col-md-4">
                    <div className="earning_steps">
                      <p>Sales earnings this month (March)</p>
                      <h2>${cv.Earning}</h2>
                    </div>
                  </div>

                }
              })

            }

            {
              instrucorDailyReport.map((cv, i) => {
                if (i === instrucorDailyReport.length - 1) {
                  return <div className="col-md-4">
                    <div className="earning_steps">
                      <p>Your balance</p>
                      <h2>${cv.Earning}</h2>
                    </div>
                  </div>

                }
              })

            }    {
              instrucorDailyReport.map((cv, i) => {
                if (i === instrucorDailyReport.length - 1) {
                  return <div className="col-md-4">
                    <div className="earning_steps">
                      <p>Total value of your sales</p>
                      <h2>${cv.Earning}</h2>
                    </div>
                  </div>

                }
              })

            }
            {/* <div className="col-md-4">
              <div className="earning_steps">
                <p>Your balance</p>
                <h2>$1100</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="earning_steps">
                <p>Total value of your sales</p>
                <h2>$4500</h2>
              </div>
            </div>*/}
            <div className="col-lg-4 col-md-12">
              <div className="top_countries mt-50">
                <div className="top_countries_title">
                  <h2>Your Top Courses</h2>
                </div>
                <ul className="country_list">
                  {
                    topCourseList.map((cv, i) => {
                      return (
                        <li key={i}>
                          <div className="country_item">
                            <div className="country_item_left">
                              <span>{cv.title}</span>
                            </div>
                            <div className="country_item_right">
                              <span>${cv.price}</span>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }

                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="date_selector">
                {/* <div className="ui selection dropdown skills-search vchrt-dropdown">
                  <input name="date" type="hidden" value="default" />
                  <i className="dropdown icon d-icon"></i>
                  <div className="text">Item Sales</div>
                  <div className="menu">
                    <div className="item" data-value="0">
                      Total Sales
                    </div>
                    <div className="item" data-value="1">
                      2021
                    </div>
                  </div>
                </div> */}
                <div className="date_list152">
                  <table>
                    <tr>
                      <td>
                        <h4 style={{ color: 'blue' }} onClick={() => GetInstructorallErning()}>All Time</h4></td><td><h4 style={{ color: 'blue' }} onClick={() => GetInstructoroneyearErning()}>/{currentYear}</h4></td><td><h4 style={{ color: 'blue' }} onClick={() => GetInstructorDailyErning()}>/{longMonth}</h4></td></tr>
                  </table>
                  {/* <a href="#"></a> */}
                </div>
              </div>
              <div className="table-responsive mt-30">
                <TableScrollbar rows={10}>
                  <table className="table ucp-table earning__table">
                    <thead className="thead-s">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Item Sales Count</th>
                        <th scope="col">Earning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        instrucorDailyReport.map((cv, i) => {
                          if (i < instrucorDailyReport.length - 1) {
                            return <tr>
                              <td>{cv.Date}</td>
                              <td>{cv.Item_Sales_Count}</td>
                              <td>${cv.Earning}</td>
                            </tr>
                          }
                          if (i === instrucorDailyReport.length - 1) {
                            return <tr bgcolor="black">
                              <td><font color="#fff">{cv.Date}</font></td>
                              <td><font color="#fff">{cv.Item_Sales_Count}</font></td>
                              <td><font color="#fff">${cv.Earning}</font></td>
                            </tr>
                          }
                        })

                      }


                    </tbody>
                    {/* <tfoot>
                   
                    {
                      instrucorDailyReport.map((cv,i)=>{
                        if (i === instrucorDailyReport.length - 1) {
                        return  <tr>
                        <td>{cv.Date}</td>
                        <td>{cv.Item_Sales_Count}</td>
                        <td>${cv.Earning}</td>
                      </tr>
                        }
                      })
                    
                    }
                  </tfoot> */}
                  </table>
                </TableScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstructorEarning;
