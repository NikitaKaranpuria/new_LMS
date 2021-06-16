import React, { useState } from "react";
import verifiedAccount from "../../images/verified-account.svg";
import "./instructorstyle.css";
import {
  CModalFooter,
  CTooltip,
  CButton,
  CModal,
  CModalBody,
  CModalHeader
} from '@coreui/react';
 import axios from 'axios';

 import BaseUrl from "../BaseUrl/BaseUrl";
 import { confirmAlert } from 'react-confirm-alert';
 import 'react-confirm-alert/src/react-confirm-alert.css';
//instructor verification component for instructor verification page
function InstructorVerification(params) {
  const [instructorName,setInstructorName]=useState('');
  const [error,setError]=useState('');
  const [images,setImages]=useState('');
  const [nameErro,setNameError]=useState('');
  const change=(e)=>{
    setNameError('')
    setInstructorName(e.target.value)
  }
  const imageChanges=(e)=>{
    setImages('')
    try {
      if (e.target.files[0].size > 5242880) {
        setError({screenshote:'image size is above 5mb'})
      }
      else {
        setImages(e.target.files[0])
      }
    } catch (error) {
      //console.log(error)
    }
  }
  const instructorVarificationSubmit=async()=>{
    const  reWhiteSpace = new RegExp(/^\s+$/);
    if(instructorName==='' || reWhiteSpace.test(instructorName)){
      setNameError('Name is not valid')
  }
  else{
    setNameError('')
    const FeedbackAddData = new FormData();
    FeedbackAddData.append('name',instructorName)
    
    FeedbackAddData.append('demo_document',images,images.name)
    await axios.post(`${BaseUrl}forentend/varification/`, FeedbackAddData, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
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
              <CModalBody>
                <h4>Your Document  is Submited  Successfully</h4>
              </CModalBody>
              <CModalFooter>

                <CButton

                  style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                  className='btn btn-block'
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );

        }

      });
      
      setInstructorName('')
      setImages('')
    }).catch((error) => {
      // console.log('feed back is not submitted')
    })

 
  }
}
  return (
    <div className="sa4d25" id="instructorstyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-check-circle"></i> Verification
            </h2>
          </div>
        </div>
        <div className="row justify-content-xl-center justify-content-lg-center justify-content-md-center">
          <div className="col-xl-6 col-lg-8 col-md-8">
            <div className="verification_content">
              <img src={verifiedAccount} alt="" />
              <h4>Verification with SafetyTek</h4>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                className aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos eros ac, sagittis orci.
              </p>
              <ul className="alert_verification">
                <li>
                  <div className="required_group">
                    <div className="edututs_required_img">
                      <i className="uil uil-dashboard"></i>
                    </div>
                    <div className="edututs_required">
                      <span>
                        <strong>14 subscribers</strong>
                      </span>
                      <span>100 required</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="required_group">
                    <div className="edututs_required_img">
                      <i className="uil uil-dashboard"></i>
                    </div>
                    <div className="edututs_required">
                      <span>
                        <strong>10 public watch hours</strong>
                      </span>
                      <span>100 required</span>
                    </div>
                  </div>
                </li>
              </ul> */}
              {/* <div className="apply_verify_text">
                <i className="uil uil-check-circle"></i>We'll send you an email
                when you're eligible to apply
              </div> */}
              <div className="verification_form">
                <h4>Verify Your ID</h4>
           
                  <div className="ui search focus mt-50 lbel25">
                    <label>Full Name</label>
                    <div className="ui left icon input swdh19">
                      <input
                        className="prompt srch_explore"
                        type="text"
                        placeholder="Full name"
                      
                        maxlength="60"
                        id="full[name]"
                        onChange={change}
                        value={instructorName}
                      />
                    </div>
                   <p style={{color:'red'}}>{nameErro?nameErro:''}</p> 
                  </div>
                  <div className="part_input mt-30 lbel25">
                    <label>Upload Document*</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile06"
                          onChange={imageChanges}
                        />
                        <label
                          className="custom-file-label"
                          for="inputGroupFile06"
                        >
                          {images?images.name:'Choose File'}
                        </label>
                      </div>
                      <p style={{color:'red'}}>     {error?error:''}</p>
                    </div>
                  </div>
                  <button className="verify_submit_btn"  onClick={instructorVarificationSubmit}>
                    Submit Now
                  </button>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InstructorVerification;
