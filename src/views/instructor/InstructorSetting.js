import React from "react";
import { Link } from "react-router-dom";
import AccountTab from "./instructorSettingComponent/AccountTab";
import Notificationtab from "./instructorSettingComponent/NotificationTab";
import PrivacyTab from "./instructorSettingComponent/PrivacyTab";
import CloseAccountTab from "./instructorSettingComponent/CloseAccountTab";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import "./instructorstyle.css";

function InstructorSetting(params) {
  return (
    <div className="sa4d25" id="instructorstyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-cog"></i> Settings
            </h2>
            <br />
            <br />

            <div className="setting_tabs">
              <CTabs activeTab="account">
                <div className=" nav-pills mb-4">
                  <CNav>
                    <CNavItem>
                      <CNavLink data-tab="account">
                        <span>Account</span>
                      </CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                      <CNavLink data-tab="notification">
                        <span>Notification</span>
                      </CNavLink>
                    </CNavItem> */}
                    {/* <CNavItem>
                      <CNavLink data-tab="privacy">
                        <span>Privacy</span>
                      </CNavLink>
                    </CNavItem> */}
                    {/* <CNavItem>
                      <CNavLink data-tab="closeaccount">
                        <span>Close Account</span>
                      </CNavLink>
                    </CNavItem> */}
                  </CNav>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <CTabContent>
                    <CTabPane data-tab="account">
                      <AccountTab />
                    </CTabPane>
                    <CTabPane data-tab="notification">
                      <Notificationtab />
                    </CTabPane>
                    <CTabPane data-tab="privacy">
                      <PrivacyTab />
                    </CTabPane>
                    <CTabPane data-tab="closeaccount">
                      <CloseAccountTab />
                    </CTabPane>
                  </CTabContent>
                </div>
              </CTabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSetting;
