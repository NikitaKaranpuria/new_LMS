import React from "react";
import "../../../containers/unicons.css";
import "../../../containers/style.css";
import "../../../containers/responsive.css";
import "../../../containers/semantic.min.css";
import "../../../containers/all.min.css";
import logo from "../../../images/logo-st-lms.png";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
//forgot password page component
const ForgotPassword = () => {
  //validation for sign in
  const { register, handleSubmit, errors } = useForm();
  //forgit password submit function
  const onSubmit = (forgetPasswordByEmail) => {
  };
  return (
    <div class="container">
      <div class="row justify-content-lg-center justify-content-md-center">
        <div class="col-lg-12">
          <div class="main_logo25" id="logo">
            <Link to="#">
              <img src={logo} alt="" height="auto" width="100%" />
            </Link>
            <Link to="#">
              <img
                class="logo-inverse"
                src="images/logo-st-lms"
                alt=""
                height="auto"
                width="100%"
              />
            </Link>
          </div>
        </div>

        <div class="col-lg-6 col-md-8">
          <div class="sign_form">
            <h2>Request a Password Reset</h2>
            <form>
              <div class="ui search focus mt-50">
                <div class="ui left icon input swdh95">
                  <input
                    class="prompt srch_explore"
                    type="email"
                    placeholder="Email address"
                    ref={register({
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })}
                    name="email"
                    id="id_email"
                  />
                  <i class="uil uil-envelope icon icon2"></i>
                </div>
                {errors.email && errors.email.type === "required" && (
                  <p style={{ color: "red" ,textAlign:"left"}}>Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p style={{ color: "red",textAlign:"left"}}>Email is not valid.</p>
                )}
              </div>
              <button class="login-btn" onClick={handleSubmit(onSubmit)}>
                Reset Password
              </button>
            </form>
            <p class="mb-0 mt-30">
              Go Back <Link to="/sign_in">Sign In</Link>
            </p>
          </div>
          <div class="sign_footer">
            <img src="images/sign_logo.png" alt="" />© 2020{" "}
            <strong>SafetyTek</strong>. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
