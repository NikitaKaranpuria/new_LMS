import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import './Discount.css'
import ReactPaginate from 'react-paginate';
function MyPurchaseTab() {
  const [courselist, Setcourselist] = useState([])
  const [postsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  let histrory = useHistory()
  const [pageCount, setPageCount] = useState(0)
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
        const data = response.data;
        const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

        // For displaying Data
        Setcourselist(slice)
        setPageCount(Math.ceil(data.length / postsPerPage))
      });
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)

  };
  const RedirectCourseview = (courseid) => {
    let ciphertext = CryptoJS.AES.encrypt(courseid.toString(), "asdfghjkl");
    let c_id = ciphertext.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
    histrory.push(`/courseoverview/${c_id}`)
  }
  const Redirectprofileview = (instucter_id) => {
    histrory.push(`/profile_view/${instucter_id}`)
  }
  const Redirectcategoryfilter = (id) => {
    localStorage.removeItem('CategoryID')
    localStorage.setItem("CategoryID", JSON.stringify(id));

    histrory.push("/search_results");
  }
  useEffect(() => {
    RecieveCourse();
  }, [offset]);
  return (
    <>
      <div className="table-responsive mt-30">
        <table className="table ucp-table">
          <thead className="thead-s">
            <tr style={{ textAlign: "center" }}>
              <th className="text-center" scope="col">
                Item No.
              </th>
              <th className="cell-ta" scope="col">
                Title
              </th>
              <th className="cell-ta" scope="col">
                Instructor
              </th>
              <th className="cell-ta" scope="col">
                Category
              </th>

              <th className="text-center" scope="col">
                Price
              </th>
              <th className="text-center" scope="col">
                Purchase Date
              </th>
              {/* <th className="text-center" scope="col">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {
              courselist.map((cv, i) => {
                return (<>
                  <tr>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center" onClick={() => RedirectCourseview(cv.id)} style={{ cursor: 'pointer', color: 'blue' }}>{cv.course_title}</td>
                    <td className="text-center" onClick={() => Redirectprofileview(cv.instucter_id)} style={{ cursor: 'pointer', color: 'blue' }}>{cv.Instructor}</td>
                    <td className="text-center" onClick={() => Redirectcategoryfilter(cv.id_category)} style={{ cursor: 'pointer', color: 'blue' }}>{cv.Category}</td>
                    <td className="text-center">{cv.course_price}</td>
                    <td className="text-center">
                      {cv.Purchase_Date}
                    </td>


                    {/* <td className="text-center" onClick={()=>RedirectCourseview(cv.id)} style={{cursor:'pointer'}}>
              
                View
                
              </td> */}
                  </tr>

                </>)
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
          activeClassName={"active"} />
      </div>
    </>
  );
}

export default MyPurchaseTab;
