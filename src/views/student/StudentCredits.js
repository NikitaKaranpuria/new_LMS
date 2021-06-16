import React from "react";
import "./studentstyle.css";
// import Mastercard from "../../images/Mastercard.svg";
import { CInput, CSelect, CLabel, CButton } from "@coreui/react";

function StudentCredits(params) {
  return (
    <div className="sa4d25">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="st_title">
              <i className="uil uil-wallet"></i> Wallet
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="top_countries mt-30">
              <div className="top_countries_title">
                <h2>Available Balance</h2>
              </div>
              <div className="payout_content">
                <span>
                  <strong>$150</strong>
                </span>

                <p>
                  <small className="payout__small-notification">
                    Your credits can be used on
                    <strong>purchase courses</strong>
                  </small>
                </p>
              </div>
            </div>
            <div className="top_countries mt-30">
              <div className="top_countries_title">
                <h2>Saved Cards</h2>
              </div>
              <div className="payout_content">
                {/* <img src={Mastercard} alt="" /> */}
                <div className="payout__added">
                  <strong>Added:</strong>
                  25 Jan 2021
                </div>
                <p>
                  <a href="#" className="payout__btn">
                    Change Card
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="top_countries mt-30">
              <div className="top_countries_title">
                <h2>Add Credit Balance</h2>
              </div>
              <div className="credits_content">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="ui search focus mt-30 lbel25">
                        <CLabel>Add Blalance</CLabel>
                        <div className="ui left icon input swdh11 swdh19">
                          <CInput
                            className="prompt srch_explore"
                            type="text"
                            name="balance[add]"
                            value=""
                            id="id_balance"
                            required=""
                            maxlength="4"
                            placeholder="0"
                          />
                          <i className="uil uil-dollar-alt icon icon8"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ui search focus mt-30 lbel25">
                        <CLabel>Holder Name</CLabel>
                        <div className="ui left icon input swdh19">
                          <CInput
                            className="prompt srch_explore"
                            type="text"
                            name="holder[name]"
                            value=""
                            id="id_holdername"
                            required=""
                            maxlength="64"
                            placeholder="Enter holder name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ui search focus mt-30 lbel25">
                        <CLabel>Card Number</CLabel>
                        <div className="ui left icon input swdh19">
                          <CInput
                            className="prompt srch_explore"
                            type="text"
                            name="card[number]"
                            maxlength="16"
                            placeholder="Card #"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="lbel25 mt-30">
                        <CLabel>Expiration Month</CLabel>
                        <CSelect
                          className="ui hj145 dropdown cntry152 prompt srch_explore"
                          name="card[expire-month]"
                        >
                          <option value="">Month</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </CSelect>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="ui search focus mt-30 lbel25">
                        <CLabel>Expiration Year</CLabel>
                        <div className="ui left icon input swdh19">
                          <CInput
                            className="prompt srch_explore"
                            type="text"
                            name="card[expire-year]"
                            maxlength="4"
                            placeholder="Year"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="ui search focus mt-30 lbel25">
                        <CLabel>CVC</CLabel>
                        <div className="ui left icon input swdh19">
                          <CInput
                            className="prompt srch_explore"
                            type="text"
                            name="card[cvc]"
                            maxlength="3"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <CButton className="add_crdit_btn mt-50" type="submit">
                        Add Credit
                      </CButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-credits">
              <div className="table-responsive mt-30">
                <table
                  className="table ucp-table earning__table"
                  id="content-table"
                >
                  <thead className="thead-s">
                    <tr>
                      <th scope="col">Amount</th>
                      <th scope="col">Credit Method</th>
                      <th scope="col">Date Processed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$100.00</td>
                      <td>Mastercard</td>
                      <td>15 Jan 2021</td>
                    </tr>
                    <tr>
                      <td>$50.00</td>
                      <td>Mastercard</td>
                      <td>10 Feb 2021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCredits;
