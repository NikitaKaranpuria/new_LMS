import React, { useRef, useEffect, useState } from "react";
import { CInput, CLabel } from "@coreui/react";

import { Link } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
function AccountTab() {
  const [setting, setSetting] = useState({
    first_name: "",
    last_name: "",
    title: "",
    biography: "",
    Facebook_Linl: "",
    Twitter_Link: "",
    LinkedIn_Link: "",
    Youtube_Link: "",
  });

  let history = useHistory();
  const UserAPICall = async () => {
    await axios
      .get(`${BaseUrl}forentend/users`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setSetting(response.data.data[0]);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push(`/sign_in`);
    }
    UserAPICall();
  }, []);
  const onSubmit = async () => {
    let urlencoded = new URLSearchParams();

    urlencoded.append("first_name", setting.first_name);
    urlencoded.append("last_name", setting.last_name);
    urlencoded.append("title", setting.title);
    urlencoded.append("biography", setting.biography);
    urlencoded.append("Facebook_Link", setting.Facebook_Link);
    urlencoded.append("Twitter_Link", setting.Twitter_Link);
    urlencoded.append("LinkedIn_Link", setting.LinkedIn_Link);
    urlencoded.append("Youtube_Link", setting.Youtube_Link);

    await axios
      .post(`${BaseUrl}foretend/acountinfo`, urlencoded, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then((response) => {
        setSetting(response.data);
        history.push("/instructor/instructor_dashboard");
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
  const handlechange = (e) => {
    const { name, value } = e.target;
    setSetting((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div class="account_setting">
      <h4>Your SafetyTek Account</h4>
      <div class="basic_profile">
        <div class="basic_ptitle">
          <h4>Basic Profile</h4>
          <p>Add information about yourself</p>
        </div>
        <div class="basic_form">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-6">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon input swdh11 swdh19">
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="first_name"
                        value={setting ? setting.first_name : null}
                        onChange={handlechange}
                        id="id_first_name"
                        required=""
                        maxlength="64"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon input swdh11 swdh19">
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="last_name"
                        value={setting ? setting.last_name : null}
                        onChange={handlechange}
                        id="id_last_name"
                        required=""
                        maxlength="64"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon input swdh11 swdh19">
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="title"
                        value={setting ? setting.title : null}
                        onChange={handlechange}
                        id="id_title"
                        required=""
                        maxlength="60"
                        placeholder="Headline"
                      />
                      <div
                        class="form-control-counter"
                        data-purpose="form-control-counter"
                      >
                        36
                      </div>
                    </div>
                    <div class="help-block">
                      Add a professional headline like, "Engineer at Google" or
                      "Architect."
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui form swdh30">
                      <div class="field">
                        <textarea
                          rows="3"
                          name="biography"
                          id="id_biography"
                          onChange={handlechange}
                          value={setting ? setting.biography : null}
                          placeholder="Write a little description about you..."
                        ></textarea>
                      </div>
                    </div>
                    <div class="help-block">
                      Links are not permitted in this section.
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="divider-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basic_profile1">
        <div class="basic_ptitle">
          <h4>Profile Links</h4>
        </div>
        <div class="basic_form">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-12">
                  {/* <div class="ui search focus mt-30">
                    <div class="ui left icon labeled input swdh11 swdh31">
                      <div class="ui label lb12">https://</div>
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="site"
                        value="gambolthemes.net"
                        id="id_site"
                        required=""
                        maxlength="64"
                        placeholder="yoursite.com"
                      />
                    </div>
                  </div> */}
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon labeled input swdh11 swdh31">
                      <div class="ui label lb12">http://facebook.com/</div>
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="Facebook_Link"
                        id="id_Facebook_Link"
                        value={setting ? setting.Facebook_Link : null}
                        onChange={handlechange}
                        required=""
                        maxlength="64"
                        placeholder="Facebook profile"
                      />
                    </div>
                    <div class="help-block">
                      Add your facebook username (e.g. johndoe).
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon labeled input swdh11 swdh31">
                      <div class="ui label lb12">http://twitter.com/</div>
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="Twitter_Link"
                        id="id_Twitter_Link"
                        onChange={handlechange}
                        value={setting ? setting.Twitter_Link : null}
                        required=""
                        maxlength="64"
                        placeholder="Twitter profile"
                      />
                    </div>
                    <div class="help-block">
                      Add your twitter username (e.g. johndoe).
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon labeled input swdh11 swdh31">
                      <div class="ui label lb12">http://www.linkedin.com/</div>
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="LinkedIn_Link"
                        id="id_LinkedIn_Link"
                        onChange={handlechange}
                        value={setting ? setting.LinkedIn_Link : null}
                        required=""
                        maxlength="64"
                        placeholder="Linkedin profile"
                      />
                    </div>
                    <div class="help-block">
                      Input your linkedIn resource id (e.g. in/johndoe).
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="ui search focus mt-30">
                    <div class="ui left icon labeled input swdh11 swdh31">
                      <div class="ui label lb12">http://www.youtube.com/</div>
                      <CInput
                        class="prompt srch_explore"
                        type="text"
                        name="Youtube_Link"
                        id="id_Youtube_Link"
                        onChange={handlechange}
                        value={setting ? setting.Youtube_Link : null}
                        required=""
                        maxlength="64"
                        placeholder="Youtube profile"
                      />
                    </div>
                    <div class="help-block">
                      Input your youtube username (e.g. johndoe).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="save_btn" type="submit" onClick={onSubmit}>
        Save Changes
      </button>
    </div>
  );
}

export default AccountTab;
