import React from "react";
import { Link } from "react-router-dom";
import { CInput, CLabel, CSelect } from "@coreui/react";
import $ from 'jquery';
import './Discount.css'
import { useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from 'react-confirm-alert';
import {
  CButton,
   CModal, CModalHeader, CModalBody, CModalFooter
 } from '@coreui/react'
 import ReactPaginate from 'react-paginate';
function DiscountTab() {
  let history = useHistory();
  const [postsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  
  const [pageCount, setPageCount] = useState(0)
  const [discountAdd, SetDiscountAdd] = useState({
    title: "",
    discounted_flag:1,
    discounted_price: 0,
    start_discount_date: "",
    end_discount_date: ""
  })

const [course, SetCourse] = useState([])
const [myCourseApi, setMycourseApi] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    GetCourseData();
    GetMycourseApiData();
  }, []);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
   setOffset(selectedPage + 1)

};


//#region method
  const NewDiscount = () => {
    $(document).ready(function () {
      $("#newDiscount").click(function () {
        $("#collapseOne").toggleClass("show");
        $(this).toggleClass("active");
      });
    });
  }
  const GetCourseData=async()=>{
    await axios.get(`${BaseUrl}forentend/discountcourse`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      // console.log(response,"get list")
     
 // For displaying Data
 SetCourse(response.data)

    
    });
  }
  const GetMycourseApiData=async()=>{
    await axios.get(`${BaseUrl}forentend/instructerlist`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setMycourseApi(response.data)
    });
  }
 
  const change = (e) => {
    
    const { name, value } = e.target
    SetDiscountAdd((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    
  }
  const DiscountaddAPICall=async()=>{
   if(discountAdd.discounted_flag==0 && discountAdd.discounted_price>=100){
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
    <h4>Discount Percentage Is More Then 100</h4>
            </CModalBody>
            <CModalFooter>
    
              <CButton
               
                style={{backgroundColor:'rgb(155, 61, 53)',color:'white'}}
                className='btn btn-block'
                onClick={onClose}
              >Ok</CButton>
            </CModalFooter>
          </CModal>
    
        );
   }
  })
}else{

    await axios.post(`${BaseUrl}forentend/adddiscount`, discountAdd, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then((response) => {
      console.log(response,"discount add")
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
    <h4>Discount Created Successfully</h4>
            </CModalBody>
            <CModalFooter>
    
              <CButton
               
                style={{backgroundColor:'rgb(155, 61, 53)',color:'white'}}
                className='btn btn-block'
                onClick={onClose}
              >Ok</CButton>
            </CModalFooter>
          </CModal>
    
        );
       
      }
     
    });  
})
GetCourseData();
  }
  }
 
  //#endregion
  return (
    <>
      <div
        className="panel-group"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <div className="panel-title adcrse1250">
              <div
               
                  className="collapsed"
                  // data-toggle="collapse"
                  // data-parent="#accordion"
                  // aria-expanded="false"
                  // aria-controls="collapseOne"
                  id="newDiscount"
                  onClick={NewDiscount}
                >
                  New Discount

              
              </div>
            </div>
          </div>
          <div
            id="collapseOne"
            className="panel-collapse collapse"
            role="tabpanel"
            aria-labelledby="headingOne"
          >
            <div className="panel-body adcrse_body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="discount_form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="mt-20 lbel25">
                          <CLabel>Course*</CLabel>
                        </div>
                        <CSelect className="ui hj145 dropdown cntry152 prompt srch_explore" name='title' value={discountAdd.title} onChange={change}>
                                     
                        <option value="">Select Course</option>
                          {myCourseApi.map((cv, i) => (
                              <option  key={i} value={cv.title}>{cv.title}</option>
                      
                          ))}
                
                        </CSelect>
                        
                        <div className="mt-20 lbel25">
                          <CLabel>Discount Type*</CLabel>
                        </div>
                        <CSelect className="ui hj145 dropdown cntry152 prompt srch_explore" name='discounted_flag' value={discountAdd.discounted_flag} onChange={change}>
                                     
                        <option value="">Select Discount Type</option>
                        <option value="1">Price</option>
                        <option value='0'>Percentage</option>
                      
                         
                
                        </CSelect>
                      
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="ui search focus mt-20 lbel25">
                          <CLabel>Discount Amount</CLabel>
                          <div className="ui left icon input swdh19">
                            <CInput
                              className="prompt srch_explore"
                              type="number"
                              name="discounted_price"
                              value={discountAdd.discounted_price}
                              required=""
                              min="1"
                              max="99"
                              placeholder="Percent (eg. 20 for 20%)"
                              onChange={change}
                            />
                          </div>
                        </div>
                      </div>
                       <div className="col-lg-6 col-md-6">
                        <div className="ui search focus mt-20 lbel25">
                          <CLabel>Start Date</CLabel>
                          <div className="ui left icon input swdh19">
                            <CInput
                              className="prompt srch_explore datepicker-here"
                              type="date"
                              data-language="en"
                              placeholder="mm/dd/yyyy"
                              name='start_discount_date'
                              value={discountAdd.start_discount_date}
                              onChange={change}

                            />
                              
                          </div>
                        </div>
                      </div> 
                    

                      <div className="col-lg-6 col-md-6">
                        <div className="ui search focus mt-20 lbel25">
                          <CLabel>End Date</CLabel>
                          <div className="ui left icon input swdh19">
                            <CInput
                              className="prompt srch_explore datepicker-here"
                              type="date"
                              onChange={change}
                              data-language="en"
                              placeholder="mm/dd/yyyy"
                              name="end_discount_date"
                              value={discountAdd.end_discount_date}
                            />
                           
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <button className="discount_btn" type="submit" onClick={DiscountaddAPICall}>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive mt-30">
        <table className="table ucp-table">
          <thead className="thead-s">
            <tr>
              <th className="text-center" scope="col">
                Item No.
              </th>
              <th className="cell-ta">Course</th>
              <th className="text-center" scope="col">
                Start Date
              </th>
              <th className="text-center" scope="col">
                End Date
              </th>
              <th className="text-center" scope="col">
                Discount
              </th>
              <th className="text-center" scope="col">
                Discount Type
              </th>
              <th className="text-center" scope="col">
                Status
              </th>
              {/* <th className="text-center" scope="col">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {
              course.map((cv,i)=>{
return <tr>
<td className="text-center">{i+1}</td>
<td className="cell-ta">{cv.title}</td>
<td className="text-center">{cv.start_discount_date}</td>
<td className="text-center">{cv.end_discount_date}</td>
<td className="text-center">{cv.discounted_price}</td>
<td className="text-center">{cv.type}</td>
<td className="text-center">
  <b className="course_active">Active</b>
</td>
{/* <td className="text-center">
  <Link to="" title="Edit" className="gray-s" style={{cursor:'pointer'}}>
    <i className="uil uil-edit-alt"></i>
  </Link>
  <Link to="" title="Delete" className="gray-s" style={{cursor:'pointer'}}>
    <i className="uil uil-trash-alt"></i>
  </Link>
</td> */}
</tr>

              })
            }
                      </tbody>
        </table>
    
      </div>

    </>
  );
}

export default DiscountTab;
