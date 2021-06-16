import React, { useState, useEffect } from "react";
import images from "../../images/courses/img-2.jpg";
import line from "../../images/line.svg";
import { Link } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";

import {
  CButton,
  CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
var OrderList = {}
//shoping cart page componenr
export default function ShopingCart() {
  let history = useHistory();
  const [userdata, SetUserData] = useState([])
  const [Cart_Detail, SetCartDetail] = useState([]);
  const [couponcode, Setcouponcode] = useState({
    couponcode: ''
  })
  let histrory = useHistory()

  const DeleteCart = async (cart_id) => {
    await axios.delete(`${BaseUrl}forentend/deleteitem/${cart_id}`, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }
    }
    ).then((response) => {
      getCartDetail()
      window.location.reload()
    })
  }
  const DeleteConfirmAPICall = async (delid) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            {/* <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div> */}
            <hr className='hr hr-success'></hr>
            <CModalBody>
              <h4>Are you sure you want to remove this course?</h4>
            </CModalBody>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'rgb(155, 61, 53)', color: 'white' }}
                className='btn ' onClick={() => {
                  DeleteCart(delid);
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
  const getCartDetail = async () => {
    await axios.get(`${BaseUrl}forentend/cart`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetCartDetail(response.data)
    });

  }
  const change = (e) => {  // for onchange method

    const { name, value } = e.target;
    Setcouponcode((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  }
  const ApplyCoupon = async (Tottal_price, Discount_price) => {
    const couponapplydata = {
      coupon: couponcode.couponcode,
      amount: Tottal_price,
      discount_amount: Discount_price
    }
    await axios.post(`${BaseUrl}forentend/couponsaply`, couponapplydata, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then((res) => {
      if (Array.isArray(res.data)) {
        SetCartDetail(res.data)
      } else {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal show={true} centered={true} onClose={onClose}>
                <div className="p-3" closeButton>
                  {" "}
                  <h3>{window.location.host} Says</h3>
                </div>
                <hr className="hr hr-success"></hr>
                <CModalBody>
                  <h4>{res.data}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: "rgb(155, 61, 53)",
                      color: "white",
                    }}
                    className="btn"
                    onClick={onClose}
                  >
                    Ok
                  </CButton>
                </CModalFooter>
              </CModal>
            );
          },
        });
      }
    })

  }

  const checkout = async (price, finalprice, code, discount, item) => {
    const data = {
      total_price: price,
      finalprice: finalprice,
      code: code,
      discount_amount: discount,
      total_items: item,
    }
    localStorage.setItem("OrderList", JSON.stringify(data))
    histrory.push("/checkout_course")
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/sign_in`);
    }
    getCartDetail();
  }, []);
  return (
    <>
      {/* ShopingCart Conponent start  */}

      <div className="_215b15">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title125">
                <div className="titleleft">
                  <div className="ttl121">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to={"/"}>Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          My Cart
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="title126">
                <h2>My Cart</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb4d25">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {

                Cart_Detail.map((cv, i) => {
                  if (i < Cart_Detail.length - 1) {
                    return (
                      <>
                        <div className="fcrse_1 mb-2">
                          <Link to={`/course_detail/${cv.course_id}`} className="hf_img">
                            <img className="cart_img" src={cv.thumbnail || images} alt="" />
                          </Link>
                          <div className="hs_content">
                            <h3 className="eps_dots eps_dots10 more_dropdown cursor-pointer" onClick={() => DeleteConfirmAPICall(cv.id)}>

                              <i className="uil uil-times cursor-pointer"></i>

                            </h3>
                            <Link
                              to={`/course_detail/${cv.course_id}`}
                              className="crse14s title900 pt-2"
                            >
                              {cv.title}
                            </Link>
                            <Link to={`/course_detail/${cv.course_id}`} className="crse-cate">
                              {/* Tags | Tags */}
                              <p>{cv.description ? cv.description : 'Be clear, concise, and easy to understand'}</p>
                            </Link>
                            <div className="auth1lnkprce">
                              <p className="cr1fot">
                                By <Link to={`/instructor/instructor_profile_view/${cv.instructer_id}`}>{cv.first_name} {cv.last_name}</Link>
                              </p>
                              <div className="prce142">${cv.price}</div>
                            </div>
                          </div>
                        </div>

                      </>
                    )
                  }
                })
              }
            </div>
            <div className="col-lg-4">
              {Cart_Detail.map((cv, i) => {
                if (i === Cart_Detail.length - 1 && cv.code === undefined) {
                  return (
                    <>
                      <div className="membership_chk_bg rght1528">
                        <div className="checkout_title">
                          <h4>Total</h4>
                          <img src={line} alt="" />
                        </div>
                        <div className="order_dt_section">
                          <div className="order_title">
                            <h4>Orignal Price</h4>
                            <div className="order_price">${cv.Total_price}</div>
                          </div>
                          <div className="order_title">
                            <h6>Discount Price</h6>
                            <div className="order_price">${cv.discount_amount}</div>
                          </div>
                          <div className="order_title">
                            <h2>Total</h2>
                            <div className="order_price5">${cv.finalprice}</div>
                          </div>
                          <div className="coupon_code">
                            <p>Learn now is applied.</p>
                            <div className="coupon_input">
                              <div className="ui search focus mt-15">
                                <div className="ui left icon input swdh11 swdh19">
                                  <input
                                    className="prompt srch_explore"
                                    type="text"
                                    name="couponcode"
                                    value=""
                                    id="id_coupon_code"
                                    required=""
                                    placeholder="Enter coupon code"
                                    onChange={change}
                                    value={couponcode.couponcode} />
                                </div>
                                <button className="code-apply-btn" type="submit" onClick={() => ApplyCoupon(cv.Total_price, cv.discount_amount)}>
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => checkout(cv.Total_price, cv.finalprice, couponcode.couponcode, cv.discount_amount, cv.total_item)} className="chck-btn22">
                            Checkout Now
                          </button>
                        </div>
                      </div>
                    </>
                  )
                } else if (i === Cart_Detail.length - 1 && cv.code !== undefined) {
                  return (
                    <>
                      <div className="membership_chk_bg rght1528">
                        <div className="checkout_title">
                          <h4>Total</h4>
                          <img src={line} alt="" />
                        </div>
                        <div className="order_dt_section">
                          <div className="order_title">
                            <h4>Orignal Price</h4>
                            <div className="order_price">${cv.Total_price}</div>
                          </div>
                          <div className="order_title">
                            <h6>Coupon Discount Price</h6>
                            <div className="order_price">${cv.coupon_discount_amount}</div>
                          </div>
                          <div className="order_title">
                            <h6>Course Discount Price</h6>
                            <div className="order_price">${cv.course_discount}</div>
                          </div>
                          <div className="order_title">
                            <h6>Total Discount Price</h6>
                            <div className="order_price">${cv.total_discount}</div>
                          </div>
                          <div className="order_title">
                            <h2>Total</h2>
                            <div className="order_price5">${cv.finalprice}</div>
                          </div>
                          <div className="coupon_code">
                            <p>Learn now is applied.</p>
                            <div className="coupon_input">
                              <div className="ui search focus mt-15">
                                <div className="ui left icon input swdh11 swdh19">
                                  <input
                                    className="prompt srch_explore"
                                    type="text"
                                    name="couponcode"
                                    value=""
                                    id="id_coupon_code"
                                    required=""
                                    maxlength="6"
                                    placeholder="Enter coupon code"
                                    onChange={change}
                                    value={couponcode.couponcode} />
                                </div>
                                <button className="code-apply-btn" type="submit" onClick={() => getCartDetail()}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => checkout(cv.Total_price, cv.finalprice, cv.code, cv.total_discount, cv.total_item)} className="chck-btn22">
                            Checkout Now
                          </button>
                        </div>
                      </div>
                    </>
                  )
                }
              })

              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
