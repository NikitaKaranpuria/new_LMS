import React from "react";
import { CInput, CLabel } from "@coreui/react";

function Notificationtab() {
  return (
    <div class="account_setting">
      <h4>Notifications - Choose when and how to be notified</h4>
      <p>Select push and email notifications you'd like to receive</p>
      <div class="basic_profile">
        <div class="basic_form">
          <div class="nstting_content">
            <div class="basic_ptitle">
              <h4>Choose when and how to be notified</h4>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss1" checked />
              <CLabel>Subscriptions</CLabel>
              <p class="ml5">
                Notify me about activity from the profiles I'm subscribed to
              </p>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss2" />
              <CLabel>Recommended Courses</CLabel>
              <p class="ml5">
                Notify me of courses I might like based on what I watch
              </p>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss3" />
              <CLabel>Activity on my comments</CLabel>
              <p class="ml5">
                Notify me about activity on my comments on others’ courses
              </p>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss4" checked />
              <CLabel>Replies to my comments</CLabel>
              <p class="ml5">Notify me about replies to my comments</p>
            </div>
          </div>
        </div>
      </div>
      <div class="divider-1 mb-50"></div>
      <div class="basic_profile">
        <div class="basic_form">
          <div class="nstting_content">
            <div class="basic_ptitle">
              <h4>Email notifications</h4>
              <p>
                Your emails are sent to gambol943@gmail.com. To unsubscribe from
                an email, click the "Unsubscribe" link at the bottom of it.{" "}
                <a href="#">Learn more</a> about emails from Edututs+.
              </p>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss5" checked />
              <CLabel>
                Send me emails about my Cursus activity and updates I requested
              </CLabel>
              <p class="ml5">
                If this setting is turned off, Cursus may still send you
                messages regarding your account, required service announcements,
                legal notifications, and privacy matters
              </p>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss6" />
              <CLabel>
                Promotions, course recommendations, and helpful resources from
                Cursus.
              </CLabel>
            </div>
            <div class="ui toggle checkbox _1457s2">
              <CInput type="checkbox" name="stream_ss7" />
              <CLabel>
                Announcements from instructors whose course(s) I’m enrolled in.
              </CLabel>
              <p class="ml5">
                To adjust this preference by course, leave this box checked and
                go to the course dashboard and click on "Options" to opt in or
                out of specific announcements.
              </p>
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

export default Notificationtab;
