import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../instructorstyle.css";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import './Discount.css'
import {

  CButton,

  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,

} from '@coreui/react'
import ReactPaginate from 'react-paginate';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
function MyCourseTab() {
  const [courselist, Setcourselist] = useState([])
  const [postsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);

  const [pageCount, setPageCount] = useState(0)
  let histrory = useHistory()
  const DeleteFetchData = async (id) => {    // delete table data
    await axios.delete(`${BaseUrl}forentend/deletecourse/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((responce) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
              <hr className='hr hr-success'></hr>
              <CModalBody><h4>{responce.data.message}</h4>
              </CModalBody>
              <CModalFooter>

                <CButton
                  style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                  className='btn'
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
      RecieveCourse()
    }).catch((error) => {
      if (error.response) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
                onClose={onClose}
              >
                <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
                <hr className='hr hr-success'></hr>
                <CModalBody> <h4>{error.response.data.message}</h4>
                </CModalBody>
                <CModalFooter>

                  <CButton
                    style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                    className='btn'
                    onClick={onClose}
                  >Ok</CButton>
                </CModalFooter>
              </CModal>

            );
          }
        });
      }
    })

  }

  const deleteCourdeById = (delid) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
            <hr className='hr hr-success'></hr>
            <CModalBody>
              <h4>Are you sure you want to delete it?</h4>
            </CModalBody>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                className='btn ' onClick={() => {
                  DeleteFetchData(delid);
                  onClose();
                }}>Yes</CButton>{' '}
              <CButton

                onClick={onClose}
                style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                className='btn'
              >No</CButton>
            </CModalFooter>
          </CModal>

        );
      }
    });

  }
  const archiveCourseById = (archiveID) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
            <hr className='hr hr-success'></hr>
            <CModalBody>
              <h4>Are you sure you want to archive it?</h4>
            </CModalBody>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                className='btn ' onClick={() => {
                  ArchiveFetchData(archiveID);
                  onClose();
                }}>Yes</CButton>{' '}
              <CButton

                onClick={onClose}
                style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                className='btn'
              >No</CButton>
            </CModalFooter>
          </CModal>

        );
      }
    });

  }
  const ArchiveFetchData = async (id) => {  
      // delete table data
    console.log("archive data fetch")
      await axios.delete(`${BaseUrl}forentend/archivecourse/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((responce) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
              <hr className='hr hr-success'></hr>
              <CModalBody><h4>{responce.data.message}</h4>
              </CModalBody>
              <CModalFooter>

                <CButton
                  style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                  className='btn'
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
      RecieveCourse()
    }).catch((error) => {
      if (error.response) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
                onClose={onClose}
              >
                <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
                <hr className='hr hr-success'></hr>
                <CModalBody> <h4>{error.response.data.message}</h4>
                </CModalBody>
                <CModalFooter>

                  <CButton
                    style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                    className='btn'
                    onClick={onClose}
                  >Ok</CButton>
                </CModalFooter>
              </CModal>

            );
          }
        });
      }
    })

  }
  const RecieveCourse = async () => {
    await axios
      .get(`${BaseUrl}forentend/instructerlist/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        // console.log(response.data, "res course")
        const data = response.data;
        const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

        // For displaying Data
        Setcourselist(slice)
        setPageCount(Math.ceil(data.length / postsPerPage))

        // console.log(response.data);
      });
  };

  const courseEdit = (editId) => {
    histrory.push(`/instructor/instructor_courses_edit/${editId}`)
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)

  };

  useEffect(() => {
    RecieveCourse();
  }, [offset]);
  return (
    <>
      <div className="table-responsive mt-30">
        <table className="table ucp-table">
          <thead className="thead-s">
            <tr style={{ textAlign: "center" }}>
              <th className="text-center" scope="col"  style={{whiteSpace:"nowrap"}}>
                Item No.
            </th>
              <th className="text-center">Title</th>
              <th className="text-center" style={{ width: "245px" }}>Course Image</th>

              <th className="text-center"style={{ width: "122px" }} scope="col">
                Publish Date
            </th>
              <th className="text-center"style={{ width: "150px" }} scope="col">
                Sales
            </th>
              <th className="text-center" scope="col">
                Sections
            </th>
              <th className="text-center" scope="col">
                Category
            </th>
              <th className="text-center" scope="col">
                Status
            </th>
              <th className="text-center" scope="col" style={{minWidth: "178px"}}>
                Action
            </th>
            </tr>
          </thead>
          <tbody>
            {
              courselist.map((cv, i) => {
                return (<>
                  <tr>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{cv.title}</td>
                    <td className="text-center"><img src={cv.thumbnail} style={{ height: "100px", width: "100px", objectFit: "cover" }}></img></td>

                    <td className="text-center">{cv.created_at}</td>
                    <td className="text-center">{cv.Sales}</td>
                    <td className="text-center">{cv.section}</td>
                    <td className="text-center">
                      {cv.Category}
                    </td>
                    <td className="text-center"  style={{whiteSpace:"nowrap"}}>
                      <b className="course_active" style={{margin:"8px"}}>{cv.status == 1 ? 'Active' : 'Inactive'}</b>
                      

                    </td>
                    <td className="text-center" style={{whiteSpace:"nowrap"}}>
                      <span onClick={() => courseEdit(cv.id)} title="Edit" className="gray-s" style={{ cursor: 'pointer' }}>
                        <i className="uil uil-edit-alt"></i>
                      </span>
                      {/* <span title="Delete" onClick={() => deleteCourdeById(cv.id)} className="gray-s" style={{ cursor: 'pointer' }}>
                        <i className="uil uil-trash-alt"></i>
                      </span> */}
                      <span title="Delete" onClick={() => archiveCourseById(cv.id)} className="gray-s" style={{ cursor: 'pointer' }}>
                        <i className="uil uil-archive-alt"></i>
                      </span>
                                         </td>
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
          activeClassName={"active"}
        />
      </div>

    </>
  );
}


export default MyCourseTab;
