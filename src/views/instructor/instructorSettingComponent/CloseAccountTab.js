import React from "react";
import { CInput } from "@coreui/react";

function CloseAccountTab() {
  return (
    <>
      <div class="account_setting">
        <h4>Close account</h4>
        <p>
          <strong>Warning:</strong> If you close your account, you will be
          unsubscribed from all your 5 courses, and will lose access forever.
        </p>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="ui search focus mt-30">
            <div class="ui left icon input swdh11 swdh19">
              <CInput
                class="prompt srch_explore"
                type="password"
                name="yourassword"
                id="id_yourpassword"
                required=""
                maxlength="64"
                placeholder="Enter your password"
              />
            </div>
            <div class="help-block">
              Are you sure you want to close your account?
            </div>
          </div>
          <button class="save_payout_btn mbs20" type="submit">
            Close Account
          </button>
        </div>
      </div>
    </>
  );
}

export default CloseAccountTab;
