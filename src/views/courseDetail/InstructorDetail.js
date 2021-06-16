import React from "react";
import leftimages from "../../images/left-imgs/img-1.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

//Instrctor Detail component for course detail page
const InstructorDetail = () => {
  let history = useHistory();
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
  }, []);
  const [instructotData, setInstructotData] = useState([]);
  const [like, setLike] = useState();
  const [unlike, setUnLike] = useState();
  const [userdata, SetUserData] = useState([])


  

  const courseid = useParams();
  const GetCourseData = async () => {
    await axios
      .get(`${BaseUrl}forentend/onecourse/${courseid.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setInstructotData(response.data.data);
      });
  };
  useEffect(() => {
    GetCourseData();
  }, [like,unlike]);
  const UserAPICall = async () => {
    await axios.get(`${BaseUrl}forentend/users`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      // console.log(response, "user list")
      SetUserData(response.data.data)
    });
  }

  const likeAddAPICall = async (id) => {
    await axios.post(`${BaseUrl}forentend/likecourse/${id}`, {
      method: 'post',
    },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          "auth": localStorage.getItem("LMS_Token")
        },
      }).then(function (response) {
        setLike(response.data)
      });
  }
  const UnlikeAPICall = async (id) => {
    await axios.post(`${BaseUrl}forentend/unlikecourse/${id}`, {
      method: 'post',
    },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          "auth": localStorage.getItem("LMS_Token")
        },
      }).then(function (response) {
        setUnLike(response.data)
      });
  }



  return (
    <>
    {
      instructotData.map((cv,i)=>{
return   <div className="_215b15 _byt1458" key={i}>
<div className="container-fluid">
  <div className="row">
    <div className="col-lg-12">
      <div className="user_dt5">
        <div className="user_dt_left">
          <div className="live_user_dt">
            <div className="user_img5">
              <Link to="#">
                <img src={cv.instructer_profile} alt="" />
              </Link>
            </div>
            <div className="user_cntnt">
              <Link to="#" className="_df7852">
                {cv.first_name} {cv.last_name}
              </Link>
              <button className="subscribe-btn">Follow</button>
            </div>
          </div>
        </div>
        <div className="user_dt_right">
          <ul>
            <li>
              {/* <Link to="#" className="lkcm152"> */}
              <div to="#" className="lkcm152">
                <i className="uil uil-eye"></i>
                <span>{cv.view?cv.view:''}</span>
              </div>  
              {/* </Link> */}
            </li>
            <li>
              <div to="#" className="lkcm152">
                <i className="uil uil-thumbs-up" onClick={() => likeAddAPICall(cv.id)}></i>
                <span>{cv.c_like?cv.c_like:'0'}</span>
              </div>
            </li>
            <li>
              <div to="#" className="lkcm152">
                <i className="uil uil-thumbs-down" onClick={() => UnlikeAPICall(cv.id)}></i>
                <span>{cv.dislike?cv.dislike:'0'}</span>
              </div>
            </li>
            <li>
              <Link to="#" className="lkcm152">
                <i className="uil uil-share-alt"></i>
                <span>15</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
      })
    }
    
    </>
  );
};
export default InstructorDetail;
