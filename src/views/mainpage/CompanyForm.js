import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../containers/unicons.css";
import "../../containers/style.css";
import "../../containers/responsive.css";
import "../../containers/semantic.min.css";
import "../../containers/all.min.css";
import { CLabel } from "@coreui/react";
import logo from "../../images/logo-st-lms.png";

//sign up page component
const CompanyForm = () => {
    //validation for sign up
    const { register, handleSubmit, errors, watch } = useForm();
    const [company, SetCompanyData] = useState([{
        company_name: "", description: "", contact: "", email: "", website: "",
    }])

    //sign up function
    let history = useHistory()
    const onSubmit = async (data) => {
        await axios.post(`${BaseUrl}forentend/createcompany`, data, {
            headers: {
                "auth": localStorage.getItem("LMS_Token")
            },
        }).then((res) => {

            SetCompanyData(res.data.data)

            history.push("/")
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
    useEffect(() => {
        if (!localStorage.getItem("LMS_Token")) {
            history.push(`/sign_in`);
        }
        // UserAPICall()
    }, [])
    return (
        // Signup Start
        <>
            <div class="sign_in_up_bg">
                <div class="container">
                    <div class="row justify-content-lg-center justify-content-md-center">
                        <div class="col-lg-12">
                            <div class="main_logo25" id="logo">
                                <Link to="/">
                                    <img src={logo} alt="" height="auto" width="100%" />
                                </Link>
                                <Link to="/">
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

                        <div class="col-lg-6 col-md-8 mb-5">
                            <div class="sign_form" >
                                <h2>Welcome to SafetyTek LMS</h2>
                                {/* <p>Sign Up and Start Learn</p> */}
                                <h2 style={{ marginBottom: "60px" }}>Create Company</h2>
                                <form>


                                    <div class="ui search focus">
                                        <CLabel style={{
                                            textAlign: "left",
                                            fontSize: "16px",
                                            display: "flex",
                                            marginBottom: "13px"
                                        }}>
                                            Company Name
                                        </CLabel>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input
                                                class="prompt srch_explore"
                                                type="text"
                                                name="company_name"
                                                id="id_company_name"
                                                placeholder="Company name"
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        {errors.company_name &&
                                            errors.company_name.type === "required" && (
                                                <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Company name is required.</p>
                                            )}
                                    </div>
                                    <div class="ui search focus mt-15">
                                        <CLabel style={{
                                            textAlign: "left",
                                            fontSize: "16px",
                                            display: "flex",
                                            marginBottom: "13px"
                                        }}>
                                            Description
                                        </CLabel>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <textarea
                                                class="prompt srch_explore"
                                                name="description"
                                                id="id_description"
                                                placeholder="Description"
                                                ref={register({ required: true })}
                                                style={{ width: "465px", padding: "15px 0 0 26px" }}
                                            />
                                        </div>
                                        {errors.description &&
                                            errors.description.type === "required" && (
                                                <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Description is required.</p>
                                            )}
                                    </div>
                                    <div class="ui search focus mt-15">
                                        <CLabel style={{
                                            textAlign: "left",
                                            fontSize: "16px",
                                            display: "flex",
                                            marginBottom: "13px"
                                        }}>
                                            Email
                                        </CLabel>
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
                                                <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Email is required.</p>
                                            )}
                                            {errors.email && errors.email.type === "pattern" && (
                                                <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Email is not valid.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div class="ui search focus mt-15">
                                        <CLabel style={{
                                            textAlign: "left",
                                            fontSize: "16px",
                                            display: "flex",
                                            marginBottom: "13px"
                                        }}>
                                            Phone-No
                                        </CLabel>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input
                                                class="prompt srch_explore"
                                                type="int"
                                                name="contact"
                                                id="id_contact"
                                                placeholder="Enter the mobile no"
                                                maxlength="10"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                        <span>
                                            {errors.contact &&
                                                errors.contact.type === "required" && (
                                                    <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Contact no is required.</p>
                                                )}
                                        </span>
                                    </div>
                                    <div class="ui search focus mt-15">
                                        <CLabel style={{
                                            textAlign: "left",
                                            fontSize: "16px",
                                            display: "flex",
                                            marginBottom: "13px"
                                        }}>
                                            Website
                                        </CLabel>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input
                                                class="prompt srch_explore"
                                                type="text"
                                                name="website"
                                                id="id_website"
                                                placeholder="Enter website name"
                                                ref={register({
                                                    required: false,
                                                })}
                                            />
                                        </div>
                                        <span>
                                            {errors.website &&
                                                errors.website.type === "required" && (
                                                    <p style={{ color: "red", textAlign: "left", marginBottom: "13px" }}>Website name is required.</p>
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
                                                    ref={register({ required: false })}
                                                />
                                                <label>
                                                    Subscribe for reciving notification on new content and
                                                    updates
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="login-btn" onClick={handleSubmit(onSubmit)}>
                                        Save
                                    </button>
                                </form>
                                <p class="sgntrm145">
                                    By sign up, you agree to our <Link to="#">Terms of Use</Link>{" "}
                                    and <Link to="#">Privacy Policy</Link>.
                                </p>
                                <p class="mb-0 mt-30 mb-2">
                                    Already have an account? <Link to="sign_in">Log In</Link>
                                </p>
                            </div>
                            {/* <div class="sign_footer">
                                © 2021 <strong>SafetyTek</strong>. All Rights Reserved.
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CompanyForm;
