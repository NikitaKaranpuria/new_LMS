import React from "react";
import { CInput } from "@coreui/react";

function PrivacyTab() {
  return (
    <div class="account_setting">
      <h4>Privacy</h4>
      <p>Modify your privacy settings here.</p>
      <div class="basic_profile">
        <div class="basic_form">
          <div class="nstting_content">
            <div class="basic_ptitle">
              <h4>Profile page settings</h4>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss8" checked />
              <label>Show your profile on search engines</label>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss9" />
              <label>Show courses you're taking on your profile page</label>
            </div>
          </div>
        </div>
      </div>
      <button class="save_btn" type="submit">
        Save Changes
      </button>
    </div>
  );
}

export default PrivacyTab;
