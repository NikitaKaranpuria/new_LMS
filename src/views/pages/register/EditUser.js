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
const Register = () => {
    //validation for sign up
    const { register, handleSubmit, errors, watch } = useForm();
    const [userdata, SetUserData] = useState({
        first_name: "", last_name: "", image: "", email: ''
    })
    const [EditImage, setImage] = useState('')
    const [preview, setPreview] = useState('')
    //sign up function
    const password = useRef({});
    let history = useHistory()
    password.current = watch("password", "");

    const imagechange = async (e) => {
        setImage(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))

    }

    const change = (e) => {
        const { name, value } = e.target
        SetUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const onSubmit = async () => {
        console.log("submit", userdata)
        let Formdata = new FormData()
        Formdata.append('first_name', userdata.first_name)
        Formdata.append('last_name', userdata.last_name)
        Formdata.append('demo_profile', EditImage)
        Formdata.append('email', userdata.email)

        await axios.post(`${BaseUrl}forentend/updateprofile`, Formdata, {
            headers: {
                auth: localStorage.getItem("LMS_Token")
            },
        }).then((response) => {
            console.log("submit response", response.data)
            SetUserData(response.data.data)
            history.push("/")
        }).catch((error) => {
            if (error.response) {
                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div id="myModal" className="modal">
                                <div className="modal-content">
                                    <span className="close">&times;{onClose}</span>
                                    <p>Some text in the modal..</p>
                                </div>

                            </div>

                        );
                    }
                });

            }
        })
    };
    const UserAPICall = async () => {
        await axios.get(`${BaseUrl}forentend/users`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
                "Content-Type": "application/x-www-form-urlencoded",
                "auth": localStorage.getItem("LMS_Token")
            },
        }).then(function (response) {
            SetUserData(response.data.data[0])

        });
    }

    useEffect(() => {
        if (!localStorage.getItem("LMS_Token")) {
            history.push(`/sign_in`);
        }
        UserAPICall()
    }, [])
    return (
        <>
            <div class="sign_in_up_bg">
                <div class="container">
                    <div class="row justify-content-lg-center justify-content-md-center">
                        <div class="col-lg-6 col-md-8">
                            <div class="sign_form">
                                <h2>Welcome to SafetyTek LMS</h2>
                                {/* <p>Sign Up and Start Learn</p> */}
                                <h2>Edit Profile</h2>

                                <div style={{ marginBottom: "-33px" }}>
                                    <img id="setprofilepic" className="profile-user-img img-fluid img-circle"
                                        // src="http://appworkdemo.com/maverick/public/uploads/user/1614839096.png"
                                        src={preview ? preview : userdata.image ? userdata.image : 'http://appworkdemo.com/maverick/public/uploads/user/1614839096.png'}
                                        alt="" style={{ "width": "200px", 'borderRadius': '50%' }} />

                                    <div class="image-upload"
                                    >
                                        <label for="file-input">
                                            <i class="fas fa-pencil-alt input-image" ></i>
                                        </label>

                                        <input id="file-input" name="profile_pic" type="file" onChange={imagechange} />
                                        {/* <div class="image-upload">
                                                        <label for="file-input">
                                                        </label>

                                                        <input  type="file" class="custom-file-input" id="inputGroupFile04" name='image' accept="image/png, image/gif, image/jpeg" 
                                                             />
                                                    </div> */}
                                    </div>



                                </div>


                                <div class="ui search focus">
                                    <div class="ui left icon input swdh11 swdh19">
                                        <input
                                            class="prompt srch_explore"
                                            type="text"
                                            name="first_name"
                                            id="id_fullname"
                                            placeholder="First name"
                                            value={userdata.first_name ? userdata.first_name : null}

                                            onChange={change}
                                        />
                                    </div>
                                    {errors.first_name &&
                                        errors.first_name.type === "required" && (
                                            <p style={{ color: "red", textAlign: "left" }}>First name is required.</p>
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
                                            onChange={change}
                                            value={userdata.last_name ? userdata.last_name : null}
                                        />
                                    </div>
                                    {errors.last_name &&
                                        errors.last_name.type === "required" && (
                                            <p style={{ color: "red", textAlign: "left" }}>Last name is required.</p>
                                        )}
                                </div>
                                <div class="ui search focus mt-15">
                                    <div class="ui left icon input swdh11 swdh19">
                                        <input
                                            class="prompt srch_explore"
                                            type="email"
                                            name="email"
                                            id="id_fullname"
                                            placeholder="Enter the email"
                                            onChange={change}
                                            value={userdata.email ? userdata.email : null}
                                        />
                                    </div>
                                    {errors.last_name &&
                                        errors.last_name.type === "required" && (
                                            <p style={{ color: "red", textAlign: "left" }}>Last name is required.</p>
                                        )}
                                </div>

                                {/* <div class="ui form mt-30 checkbox_sign">
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
                         */}
                                <button class="login-btn" onClick={handleSubmit(onSubmit)}>
                                    Save
                                </button>

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
}

export default Register;
