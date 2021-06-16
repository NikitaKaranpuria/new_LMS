import React, { useRef, useEffect, useState } from "react";
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
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//sign up page component
const ChangePassword = () => {
    //validation for sign up
    const { register, handleSubmit, errors, watch } = useForm();
    const [userdata, SetUserData] = useState([{
        old_password: "", password: ""
    }])

    //sign up function
    const password = useRef({});
    let history = useHistory()
    password.current = watch("password", "");
    const onSubmit = async (data) => {
        await axios.post(`${BaseUrl}forentend/changepassword`, data, {
            headers: {
                "auth": localStorage.getItem("LMS_Token")
            },
        }).then((res) => {

            SetUserData(res.data.data)

            history.push("/sign_in")
        }).catch((error) => {
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
                    }
                });

            }
        })
    };
    const change = (e) => {
        // for onchange method
        const { name, value } = e.target;
        SetUserData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

    useEffect(() => {
        if (!localStorage.getItem("LMS_Token")) {
            history.push(`/sign_in`);
        }
    }, [])
    return (
        // Signup Start
        <>
            <div class="sign_in_up_bg">
                <div class="container">

                    <div class="row justify-content-lg-center justify-content-md-center">
                        <div class="col-lg-12">
                            <div class="main_logo25" id="logo">
                                <Link to={"/"}>
                                    <img src={logo} alt="" height="auto" width="100%" />
                                </Link>
                                <Link to={"/"}>
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
                                {/* <p>Sign Up and Start Learn</p> */}
                                <h2 style={{ marginBottom: "50px" }}>Change Password</h2>
                                <form>

                                    <div class="ui search focus">
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input
                                                class="prompt srch_explore"
                                                type="password"
                                                name="old_password"
                                                id="id_old_password"
                                                placeholder="Enter old password"
                                                onChange={change}
                                                value={userdata.old_password}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        {errors.old_password &&
                                            errors.old_password.type === "required" && (
                                                <p style={{ color: "red", textAlign: "left", marginBottom: "26px" }}>Old password is required.</p>
                                            )}
                                    </div>
                                    <div class="ui search focus mt-15">
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input
                                                class="prompt srch_explore"
                                                type="password"
                                                name="password"
                                                id="id_password"
                                                placeholder="Enter new password"
                                                onChange={change}
                                                value={userdata.password}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        {errors.password &&
                                            errors.password.type === "required" && (
                                                <p style={{ color: "red", textAlign: "left" }}>Password is required.</p>
                                            )}
                                    </div>



                                    <button class="login-btn" onClick={handleSubmit(onSubmit)}>
                                        Save
                                          </button>
                                </form>
                                {/* <p class="sgntrm145">
                                            By sign up, you agree to our <Link to="#">Terms of Use</Link>{" "}
                  and <Link to="#">Privacy Policy</Link>.
                </p>
                                        <p class="mb-0 mt-30">
                                            Already have an account? <Link to="sign_in">Log In</Link>
                                        </p> */}
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

export default ChangePassword;
