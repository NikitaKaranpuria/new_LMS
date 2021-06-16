import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import "../../../containers/unicons.css";
import "../../../containers/style.css";
import "../../../containers/responsive.css";
import "../../../containers/semantic.min.css";
import "../../../containers/all.min.css";
import "./Login.css";
import logo from "../../../images/logo-st-lms.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import $ from 'jquery';
const Login = () => {
  //validation for sign in

  const { register, handleSubmit, errors } = useForm();
  //sign in function
  const [login, SetLogin] = useState({
    email: "",
    password: "",
    rememberPassword: false,

  });
  const [checked, setChecked] = useState(false)
  const [loginError, SetLoginError] = useState("");
  let history = useHistory();
  const onSubmit = async (LoginUserData) => {
    await axios.post(`${BaseUrl}forentend/users/login`, LoginUserData).then((reponce) => {
      if (reponce.data.kind === "user login successfully") {
        localStorage.setItem("LMS_Token", reponce.data.token);
        localStorage.setItem("LMS_Frontend_Name", reponce.data.res.first_name);
        localStorage.setItem("LMS_Frontend_EMAIL", reponce.data.res.email);
        localStorage.setItem("LMS_Frontend_UserType", reponce.data.res.id_group);
        localStorage.setItem("profile_id", reponce.data.res.id);
        history.push('/')
      }
      if (reponce.data.kind === "Email or Password is wrong") {
        SetLoginError('Email or password is wrong')
      }
      if (reponce.data.kind === 'user not exist') {
        SetLoginError('User not exist')

      }
    })
  }

  const change = (e) => {
    // for onchange method
    const { name, value } = e.target;
    SetLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const PasswordHideSHow = () => {
    $(".toggle-password").click(function () {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }
  const handleKeypress = async (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter") {
      await axios
        .post(`${BaseUrl}users/login`, login)
        .then((reponce) => {
          if (reponce.data.kind === "user login successfully") {
            localStorage.setItem("LMS_Token", reponce.data.token);
            localStorage.setItem("LMS_Frontend_Name", reponce.data.res.first_name);
            localStorage.setItem("LMS_Frontend_EMAIL", reponce.data.res.email);
            localStorage.setItem("LMS_Frontend_UserType", reponce.data.res.id_group);
            localStorage.setItem("profile_id", reponce.data.res.id);
            history.push("/");
          }
          if (reponce.data.kind === "Email or Password is wrong") {
          }
          if (reponce.data.kind === "user not exist") {
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleRememberMe = async () => {
    await setChecked(!checked)
    return checked;

  }
  if (checked == true) {
    localStorage.setItem("RememberMe", "true")

  } else {
    localStorage.removeItem("RememberMe", "false")
  }
  useEffect(() => {
    let email = localStorage.getItem("LMS_Frontend_EMAIL")
    if (email) {
      setChecked(true)
      SetLogin({ email: localStorage.getItem("LMS_Frontend_EMAIL") })
    } else {
    }
  }, []);

  return (
    //  Signup Start
    <div className="sign_in_up_bg">
      <div className="container">
        <div className="row justify-content-lg-center justify-content-md-center">
          <div className="col-lg-12">
            <div className="main_logo25" id="logo">
              <Link to="#">
                <img src={logo} alt="" height="auto" width="100%" />
              </Link>
              <Link to="#">
                <img
                  className="logo-inverse"
                  src="images/logo-st-lms"
                  alt=""
                  height="auto"
                  width="100%"
                />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-8">
            <div className="sign_form">
              <h2>Welcome Back</h2>
              <p>Log In to Your SafetyTek Lms Account!</p>
              <button className="social_lnk_btn color_btn_st">
                <i className="uil uil-shield"></i>Login with SafetyTek
              </button>

              <p>OR</p>
              <form>
                <div className="mt-15">
                  <div className="pm-new">
                    <input
                      className=""
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 50px",
                        borderRadius: "50px",
                        height: "40px",
                        fontSize: "14px !important"
                      }}
                      type="email"
                      id="id_email"
                      placeholder="Email address"
                      ref={register({
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      })}
                      value={login.email}
                      onChange={change}
                      name="email"
                    />
                    <i className="uil-envelope"></i>
                  </div>
                  <div>
                    {errors.email && errors.email.type === "required" && (
                      <p style={{ color: "red", textAlign: "left" }}>Email is required.</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p style={{ color: "red", textAlign: "left" }}>Email is not valid.</p>
                    )}
                  </div>
                </div>
                <div className="mt-15">
                  {/* <div className="pm-new">
                    <input
                      className=""
                      type="password"
                      id="id_password"
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 50px",
                        borderRadius: "50px",
                        height: "40px",
                        fontSize: "14px !important"
                      }}

                      placeholder="Password"
                      ref={register({
                        required: true,
                      })}
                      value={login.password}
                      onChange={change}
                      onKeyUp={handleKeypress}
                      name="password"
                    />
                    <i className="uil-key-skeleton-alt"></i>
                  </div>
              */}
                  <div className="pm-new">
                    <input
                      className=""
                      type="password"
                      id="id_password"
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 50px",
                        borderRadius: "50px",
                        height: "40px",
                        fontSize: "14px !important"
                      }}

                      placeholder="Password"
                      ref={register({
                        required: true,
                      })}
                      value={login.password}
                      onChange={change}
                      onKeyUp={handleKeypress}
                      name="password"
                    />

                    <i
                      toggle="#id_password"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                      onClick={PasswordHideSHow}>

                    </i>
                    <span>
                      {errors.password &&
                        errors.password.type === "required" && (
                          <p style={{ color: "red", textAlign: "left" }}>password is required.</p>
                        )}
                    </span>
                  </div>
                </div>

                <div>

                </div>
                <div className="ui form mt-30 checkbox_sign">
                  <div className="inline field">
                    <div className="ui checkbox mncheck">
                      <input
                        type="checkbox"
                        name="remeber"
                        checked={checked}
                        //defaultChecked={checked}
                        onChange={() => setChecked(!checked)}
                        ref={register({ required: false })}
                      />
                      <label>Remember Me</label>
                    </div>
                  </div>
                </div>
                <div style={{ color: "red" }}>{loginError}</div>
                <button className="login-btn" onClick={handleSubmit(onSubmit)}>
                  Sign In
                </button>
              </form>


              <p className="sgntrm145">
                Or <Link to={"/forgot_password"}>Forgot Password</Link>.
              </p>
              <p className="mb-0 mt-30 hvsng145">
                Don't have an account? <Link to="sign_up">Sign Up</Link>
              </p>
            </div>
            <div className="sign_footer">
              © 2021 <strong>SafetyTek</strong>. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
