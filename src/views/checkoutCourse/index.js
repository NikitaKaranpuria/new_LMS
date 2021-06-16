import React, { useEffect, useState } from "react";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import linesvg from "../../images/line.svg";
import CreditTab from "./CreditTab"; // credit tab for course check out page
import PaypalMethodTab from "./PaypalMethodTab"; // paypal method  tab for course check out page
import { CCollapse } from "@coreui/react";
import { useForm } from "react-hook-form";
import BaseUrl from "../BaseUrl/BaseUrl";
import Select from 'react-select'

// course check out page
// import { loadStripe } from '@stripe/stripe-js';
import $ from "jquery";
import '../../containers/style.css'
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
var first_nameError = ""
var last_nameError = ""
var countryError = ""
var cityError = ""
var stateError = ""
var zipcodeError = ""
var phonenumberError = ""
const fromDollarToCent = amount => parseInt(amount * 100);
var OrderList = {}
var modal2 = false;
const CURRENCY = "USD";
var isActive = false;
toast.configure();
const CustomToast1 = () => {
  return (
    <div>
      <i className="fa fa-check success-toast"></i>
      Please select  payment option!
    </div>
  );
};


export default function Index() {
  const [collapse, setCollapse] = useState(false);
  const [addradio, SetRadioButton] = useState(0);
  const [address, setAddressDetail] = useState([{
    first_name: "",
    last_name: "",
    companyname: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phonenumber: ""
  }]);
  const [addressData, setAddressData] = useState([])

  //form validation
  const { register, handleSubmit, errors, watch } = useForm();
  let history = useHistory()
  const [course, setCourse] = useState([]);
  const data = JSON.parse(localStorage.getItem('OrderList'));
  // console.log(data)
  const [payment, SetPayment] = useState(data)
  const [countryList, setCountryList] = useState([])
  const courseid = useParams();
  const [addEditAddress, setAddEditAddress] = useState({
    first_name: "",
    last_name: "",
    companyname: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phonenumber: ""
  })

  const [error, seterror] = useState({})
  const [lasterror, setlastnameerror] = useState({})
  const [Countryerror, setCountryerror] = useState({})
  const [cityerror, setcityerror] = useState({})
  const [address1error, setaddress1error] = useState({})
  const [stateerror, setstateerror] = useState({})
  const [zipcodeerror, setzipcodeerror] = useState({})
  const [phonenumbererror, setphonenumbererror] = useState({})


  //#region methods
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    AddressAPICall()
    GetCourseData()
    GetCountryData()
    GetAddress()
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target
    setAddEditAddress((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const OnCountrychange = (e) => {
    const name = "country"
    const { label, value, value2 } = e
    setAddEditAddress((prev) => {
      return {
        ...prev,
        [name]: value2,
      }
    })
  }
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
        setCourse(response.data.data);
      });
  };
  const GetCountryData = async () => {
    await axios
      .get(`${BaseUrl}forentend/countrylist`, {
        headers: {},
      })
      .then(function (response) {
        setCountryList(response.data.data);
      });
  };
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };
  const onSubmit = async () => {

    if (addEditAddress.first_name == '') {
      seterror({ first_nameError: "First name is required" })
    } else {
      seterror({ first_nameError: "" })
    }
    if (addEditAddress.last_name == '') {
      setlastnameerror({ last_nameError: "Last name is required" })
    } else {
      setlastnameerror({ last_nameError: "" })

    }
    if (addEditAddress.country == '') {
      setCountryerror({ countryError: "Country is required" })
    } else {
      setCountryerror({ countryError: "" })

    }
    if (addEditAddress.address1 == '') {
      setaddress1error({ address1Error: "Address is required" })
    } else {
      setaddress1error({ address1Error: "" })

    }
    if (addEditAddress.city == '') {
      setcityerror({ cityError: "City is required" })
    } else {
      setcityerror({ cityError: "" })

    }
    if (addEditAddress.state == '') {
      setstateerror({ stateError: "State is required" })
    } else {
      setstateerror({ stateError: "" })

    }
    if (addEditAddress.zipcode == '') {
      setzipcodeerror({ zipcodeError: "Zipcode is required" })
    } else {
      setzipcodeerror({ zipcodeError: "" })

    }
    if (addEditAddress.phonenumber == '') {
      setphonenumbererror({ phonenumberError: "Phone number is required" })
    } else {
      setphonenumbererror({ phonenumberError: "" })

    }
    if (
      addEditAddress.first_name &&
      addEditAddress.last_name &&
      addEditAddress.address1 &&
      addEditAddress.city &&
      addEditAddress.state &&
      addEditAddress.zipcode &&
      addEditAddress.phonenumber &&
      first_nameError === "" &&
      last_nameError === "" &&
      cityError === "" &&
      stateError === "" &&
      zipcodeError === "" &&
      phonenumberError === ""
    ) {
      var urlencoded = new URLSearchParams();

      urlencoded.append("first_name", addEditAddress.first_name);

      urlencoded.append("last_name", addEditAddress.last_name);
      urlencoded.append("companyname", addEditAddress.companyname);
      urlencoded.append("country", addEditAddress.country);
      urlencoded.append("address1", addEditAddress.address1);
      urlencoded.append("address2", addEditAddress.address2);
      urlencoded.append("city", addEditAddress.city);
      urlencoded.append("state", addEditAddress.state);
      urlencoded.append("zipcode", addEditAddress.zipcode);
      urlencoded.append("phonenumber", addEditAddress.phonenumber);


      await axios.put(`${BaseUrl}forentend/editaddress`, urlencoded, {
        headers: {
          "auth": localStorage.getItem("LMS_Token")
        },
      }).then(function (response) {
        console.log(response.data.data.length,)
        if(response.data.data.length > 0) {

          setAddEditAddress(response.data.data)
        }
        window.location.reload();
      });
    }
  }


  const GetAddress = async () => {
    await axios.get(`${BaseUrl}forentend/myaddress`, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      if (response.data.data.length > -0) {
        console.log('aaaaaa')
        setAddEditAddress(response.data.data[0])
      }
    });
  }
  const AddressAPICall = async () => {
    await axios.get(`${BaseUrl}forentend/myaddress`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setAddressDetail(response.data.data)

    });
  }
  const onToken = (amount, description) => async token => {
    modal2 = false;
    isActive = true;
    const paymentdata = {
      ...payment,
      email: token.email,
      stripeid: token.id,
      token: token,
      description: description,
      amount: amount,
      currency: CURRENCY,
      cardName: token.card.name,
    }
    await axios.post(`${BaseUrl}forentend/createorder2`, paymentdata, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then((response) => {
      SetPayment({
        transactionId: response.data.balance_transaction,
        paymentType: "credit_debit"
      })
      localStorage.removeItem('OrderList')
      if (localStorage.getItem('LMS_Frontend_UserType') == 3) {
        localStorage.setItem("mypurchasetab", "mypurchase");
        history.push("/instructor/instructor_courses")
      } else if (localStorage.getItem('LMS_Frontend_UserType') == 2) {
        history.push("/student/student_courses")
      } else {
        history.push("/instructor/instructor_courses")
      }
    });



  };
  const modalToggle = () => {
    if (addradio == 0) {
      $('#creditdebit').click();
    }
    else {
      toast.success(<CustomToast1 />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const RadioTypeChange = (event) => {
    SetRadioButton(event.target.value);

  }
  const options = countryList.map((cv, index) => (
    { value: cv.countryname, label: cv.countryname, value2: cv.countryflag }
  ))
  //#endregion
  return (
    <>
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
                          <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="#">Course Title</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Checkout
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="title126">
                <h2>Checkout</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb4d25">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="membership_chk_bg">
                <div className="checkout_title">
                  <h4>Billing Details</h4>
                  <img src="images/line.svg" alt="" />
                </div>
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="address1">
                      <div className="panel-title">
                        <Link
                          className="collapsed"
                          data-toggle="collapse"
                          onClick={toggle}
                          data-parent="#accordion"
                          aria-expanded="false"
                          aria-controls="collapseaddress1"
                        >
                          {
                            address.length > 0 ?
                              "Edit Address" :
                              "Add Address"
                          }
                        </Link>

                        <CCollapse show={collapse}>
                          <div className="panel-body">

                            <div className="row">
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>First Name*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="first_name"
                                      onChange={handleChange}
                                      id="id_name"
                                      value={addEditAddress ? addEditAddress.first_name : null}
                                      maxlength="64"
                                      placeholder="First name"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{error.first_nameError}</div>

                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Last Name*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="last_name"
                                      onChange={handleChange}
                                      //innerRef={register({ required: true })}
                                      id="id_surname"
                                      value={addEditAddress ? addEditAddress.last_name : null}
                                      maxlength="64"
                                      placeholder="Last name"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{lasterror.last_nameError}</div>

                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Company Name</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="companyname"
                                      onChange={handleChange}
                                      //innerRef={register({ required: true })}
                                      id="id_academy"
                                      value={addEditAddress ? addEditAddress.companyname : null}

                                      maxlength="64"
                                      placeholder="Academy name"
                                    />
                                    {/* {errors.companyname && errors.companyname.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">First name is required.</p>
                                    )} */}
                                  </div>
                                  <div className="help-block">
                                    If you want your invoices addressed to a company.
                                    Leave blank to use your full name.
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="mt-30 lbel25">
                                  <label>Country*</label>
                                </div>
                                <div className="menu">
                                  <Select onChange={OnCountrychange}
                                    value={options.find(obj => obj.value === (addEditAddress ? addEditAddress.country : null))}
                                    style={{
                                      width: "100%",
                                      borderRadius: "21px",
                                      padding: "10px 24px"
                                    }}
                                    className="prompt srch_explore"
                                    placeholder="Select country"
                                    options={options}
                                  >

                                  </Select>

                                </div>
                                <div style={{ fontSize: "12px", color: "red" }}>{Countryerror.countryError}</div>

                              </div>
                              <div className="col-lg-12">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Address1*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="address1"
                                      onChange={handleChange}
                                      // innerRef={register({ required: true })}
                                      id="id_address1"
                                      value={addEditAddress ? addEditAddress.address1 : null}

                                      maxlength="300"
                                      placeholder="Address line 1"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{address1error.address1Error}</div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Address2</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="address2"
                                      onChange={handleChange}
                                      //innerRef={register({ required: true })}
                                      id="id_address2"
                                      value={addEditAddress ? addEditAddress.address2 : null}

                                      maxlength="300"
                                      placeholder="Address line 2"
                                    />
                                    {/* {errors.address2 && errors.address2.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">First name is required.</p>
                                    )} */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>City*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="city"
                                      onChange={handleChange}
                                      //innerRef={register({ required: true })}
                                      id="id_city"
                                      value={addEditAddress ? addEditAddress.city : null}

                                      maxlength="64"
                                      placeholder="City"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{cityerror.cityError}</div>

                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>State / Province / Region*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="state"
                                      onChange={handleChange}
                                      //innerRef={register({ required: true })}
                                      id="id_state"
                                      value={addEditAddress ? addEditAddress.state : null}

                                      maxlength="64"
                                      placeholder="State / Province / Region"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{stateerror.stateError}</div>

                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Zip/Postal code*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="zipcode"
                                      //innerRef={register({ required: true })}
                                      id="id_zip"
                                      value={addEditAddress ? addEditAddress.zipcode : null}
                                      onChange={handleChange}
                                      maxlength="64"
                                      placeholder="Zip / Postal code"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{zipcodeerror.zipcodeError}</div>

                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="ui search focus mt-30 lbel25">
                                  <label>Phone Number*</label>
                                  <div className="ui left icon input swdh11 swdh19">
                                    <input
                                      className="prompt srch_explore"
                                      type="text"
                                      name="phonenumber"
                                      //innerRef={register({ required: true })}
                                      id="id_phone"
                                      value={addEditAddress ? addEditAddress.phonenumber : null}
                                      maxlength="12"
                                      onChange={handleChange}
                                      placeholder="Phone number"
                                    />
                                  </div>
                                  <div style={{ fontSize: "12px", color: "red" }}>{phonenumbererror.phonenumberError}</div>

                                </div>
                              </div>
                              <div className="col-lg-6">
                                <button
                                  className="save_address_btn"
                                  type="submit"
                                  onClick={onSubmit} >Submit</button>


                              </div>
                            </div>

                          </div>
                        </CCollapse>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    {address.map((cv, index) => (
                      <div key={index}>



                        <div className="address_text">
                          <div className="row">

                            <div className="col-md-1"
                              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                              <input
                                type="radio"
                                id="addradio"
                                name="addradio"
                                value="1"
                                onChange={RadioTypeChange}
                                checked={addradio === "1" ? true : false}
                              />
                            </div>
                            <div className="col-md-10">
                              <div className="mr-2" style={{ display: "flex" }}>
                                <p style={{ fontWeight: "bold" }}>{cv ? cv.first_name : null} {cv ? cv.last_name : null}</p>
                              </div>
                              <div className="mr-2" style={{ display: "flex" }}>

                                <p>{cv ? cv.address1 : null}  {cv ? cv.country : null}  {cv ? cv.state : null}</p>
                              </div>
                              <div className="mr-2" style={{ display: "flex" }}>
                                <p></p>
                              </div>
                              <div className="mr-2" style={{ display: "flex" }}>

                                {/* <p>{cv.address2}</p> */}
                              </div>
                              <div className="mr-2" style={{ display: "flex" }}>
                                <p>{cv ? cv.city : null}</p>
                              </div>

                              <div className="mr-2" style={{ display: "flex" }}>
                                {/* <label>zipcode:</label> */}

                                <p>{cv ? cv.zipcode : null}</p>
                              </div>
                              <div className="mr-2" style={{ display: "flex" }}>
                                <label>Phone-No:</label>

                                <p style={{ fontWeight: "bold", paddingLeft: "7px" }}>{cv ? cv.phonenumber : null}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    ))}
                  </div>
                </div>
              </div>

              <div className="membership_chk_bg">
                <div className="checkout_title">
                  <h4> Payment Method</h4>
                  <img src={linesvg} alt="" />
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                  <StripeCheckout

                    stripeKey="pk_test_51Ix2bqSIP8P8EascYk5s3AiId6M7g8quZPaTcT8fDSl1PWPt6K2c3tBXwnzgAem4i6q2mxmH8XyA609BED6CHxhg00EFb4uflU"
                    // token={onToken(
                    //   parseInt(data.total_price ? data.total_price : null) - data.discount_amount, "Course Payment"

                    // )}
                    label='Pay Now'
                    image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
                    token={onToken(fromDollarToCent(data.finalprice), "Course Payment")}
                    // billingAddress={this.state.buyer.street_address}
                    name="LMS"
                    amount={fromDollarToCent(
                      // parseInt(data.total_price ? data.total_price : null) - data.discount_amount
                      data.finalprice
                    )}
                    // amount={data.finalprice}
                    currency={CURRENCY}
                  >
                    {addradio == 1 ? <>


                      <button
                        className="btn btn-success btn-primary resize-credit-debit-btn float-right mr-1 btn-inline waves-effect waves-light pay-btn"
                        data-dismiss="modal"
                        id="creditdebit"
                        style={{ padding: "12px 24px" }}
                        onClick={() => { modalToggle(courseid.id) }}
                      >
                        Credit/Debit Card</button>
                    </> :

                      <button
                        className="btn btn-success btn-primary resize-credit-debit-btn float-right mr-1 btn-inline waves-effect waves-light pay-btn"
                        data-dismiss="modal"
                        id="creditdebit"
                        style={{ padding: "12px 24px" }}
                        onClick={() => { modalToggle(courseid.id) }}
                        disabled="disabled"
                      >
                        Credit/Debit Card</button>








                    }
                  </StripeCheckout>

                </div>
                {/* <CTabs activeTab="credit-tab">
                  <CNav variant="tabs">
                    <div className="checkout-tabs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <CNavItem>
                          <CNavLink data-tab="credit-tab">
                            <Link id="credit-tab" className="nav-link ">
                              <i className="uil uil-card-atm check_icon5"></i>
                              Credit/Debit Card
                            </Link>
                          </CNavLink>
                        </CNavItem>

                      </ul>
                    </div>
                  </CNav>
                  <div className="tab-content" id="myTabContent">
                    <CTabContent>
                      <CTabPane data-tab="credit-tab">
                        <CreditTab />
                      </CTabPane>

                    </CTabContent>
                  </div>
                </CTabs> */}

                {/* <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements> */}

              </div>
            </div>
            <div className="col-lg-4">
              <div className="membership_chk_bg rght1528">
                <div className="checkout_title">
                  <h4>Order Summary</h4>
                  <img src={linesvg} alt="" />
                </div>
                <div className="order_dt_section">
                  <div className="order_title">
                    <h4>Orignal Price</h4>
                    <div className="order_price">${data.total_price ? data.total_price : 0}</div>
                  </div>
                  <div className="order_title">
                    <h6>Discount Price</h6>
                    <div className="order_price">${data.discount_amount ? data.discount_amount : 0}</div>
                  </div>
                  <div className="order_title">
                    <h2>Total</h2>
                    <div className="order_price5">${data.finalprice ? data.finalprice : 0}</div>
                  </div>
                  <div className="scr_text">
                    <i className="uil uil-lock-alt"></i>Secure checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
