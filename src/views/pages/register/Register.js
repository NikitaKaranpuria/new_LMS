import React, { useRef } from "react";
import "../registermodal.css";
import "../../../containers/unicons.css";
import "../../../containers/style.css";
import "../../../containers/responsive.css";
import "../../../containers/semantic.min.css";
import "../../../containers/all.min.css";
import logo from "../../../images/logo-st-lms.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//sign up page component
const Register = () => {
  //validation for sign up
  const { register, handleSubmit, errors, watch } = useForm();
  //sign up function
  const password = useRef({});
  let histrory = useHistory();
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    const SignupData = {
      ...data,
      id_group: 2,
    };

    await axios
      .post(`${BaseUrl}forentend/registerusers`, SignupData)
      .then((res) => {
        histrory.push("/sign_in");
      })
      .catch((error) => {
        if (error.response) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close">&times;{onClose}</span>
                    <p>Some text in the Modal..</p>
                  </div>
                </div>
              );
            },
          });
        }
      });
  };
  return (
    // Signup Start
    <>
      <div class="sign_in_up_bg">
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
                <h2>Welcome to SafetyTek LMS</h2>
                <p>Sign Up and Start Learn</p>
                <form>
                  <div class="ui search focus">
                    <div class="ui left icon input swdh11 swdh19">
                      <input
                        class="prompt srch_explore"
                        type="text"
                        name="first_name"
                        id="id_fullname"
                        placeholder="First name"
                        ref={register({ required: true })}
                      />
                    </div>
                    {errors.first_name &&
                      errors.first_name.type === "required" && (
                        <p style={{ color: "red",textAlign:"left" }}>First name is required.</p>
                      )}
                  </div>
                  <div class="ui search focus mt-15">
                    <div class="ui left icon input swdh11 swdh19">
                      <input
                        class="prompt srch_explore"
                        type="text"
                        name="last_name"
                        id="id_fullname"
                        placeholder="Last name"
                        ref={register({ required: true })}
                      />
                    </div>
                    {errors.last_name &&
                      errors.last_name.type === "required" && (
                        <p style={{ color: "red",textAlign:"left" }}>Last name is required.</p>
                      )}
                  </div>
                  <div class="ui search focus mt-15">
                    <div class="ui left icon input swdh11 swdh19">
                      <input
                        class="prompt srch_explore"
                        type="email"
                        id="id_email"
                        placeholder="Email address"
                        ref={register({
                          required: true,
                          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        })}
                        name="email"
                      />
                    </div>
                    <br></br>
                    <div>
                      {errors.email && errors.email.type === "required" && (
                        <p style={{ color: "red",textAlign:"left"}}>Email is required.</p>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <p style={{ color: "red",textAlign:"left"}}>Email is not valid.</p>
                      )}
                    </div>
                  </div>
                  <div class="ui search focus mt-15">
                    <div class="ui left icon input swdh11 swdh19">
                      <input
                        class="prompt srch_explore"
                        type="password"
                        name="password"
                        id="id_password"
                        placeholder="Password"
                        ref={register({
                          required: "You must specify a password",
                          minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters",
                          },
                          MaxLength: {
                            value: 14,
                            message: "Password is not more than 14 characters",
                          },
                        })}
                      />
                    </div>
                    <span>
                      {errors.password && (
                        <p style={{ color: "red",textAlign:"left" }}>
                          {errors.password.message}
                        </p>
                      )}
                    </span>
                  </div>
                  <div class="ui search focus mt-15">
                    <div class="ui left icon input swdh11 swdh19">
                      <input
                        class="prompt srch_explore"
                        type="password"
                        name="confirm_password"
                        id="id_password"
                        placeholder="Retype password"
                        ref={register({
                          validate: (value) =>
                            value === password.current ||
                            "The passwords do not match",
                        })}
                      />
                    </div>
                    <span>
                      {errors.confirm_password && (
                        <p style={{ color: "red" }}>
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </span>
                  </div>

                  <div class="ui form mt-30 checkbox_sign">
                    <div class="inline field">
                      <div class="ui checkbox mncheck">
                        <input
                          type="checkbox"
                          tabindex="0"
                          name="remember"
                          ref={register({ required: true })}
                        />
                        <label>
                          Subscribe for reciving notification on new content and
                          updates
                        </label>
                      </div>
                    </div>
                  </div>
                  <button class="login-btn" onClick={handleSubmit(onSubmit)}>
                    Signup
                  </button>
                </form>
                <p class="sgntrm145">
                  By sign up, you agree to our <Link to="#">Terms of Use</Link>{" "}
                  and <Link to="#">Privacy Policy</Link>.
                </p>
                <p class="mb-0 mt-30">
                  Already have an account? <Link to="sign_in">Log In</Link>
                </p>
              </div>
              <div class="sign_footer">
                © 2021 <strong>SafetyTek</strong>. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
