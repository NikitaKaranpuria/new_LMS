import React from 'react'
// credit tab component for course check out page
function CreditTab() {
    return (
        <>
            <div className="tab-pane fade show ">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Holder Name</label>
                                <div className="ui left icon input swdh11 swdh19">
                                    <input className="prompt srch_explore" type="text" name="holder[name]" value="" id="id_holdername" required="" maxlength="64" placeholder="Enter Holder Name" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Card Number</label>
                                <div className="ui left icon input swdh11 swdh19">
                                    <input className="prompt srch_explore" type="text" name="card[number]" maxlength="16" placeholder="Card #" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="lbel25 mt-30">
                                <label>Expiration Month</label>
                                <select className="ui hj145 dropdown cntry152 prompt srch_explore" name="card[expire-month]">
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
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Expiration Year</label>
                                <div className="ui left icon input swdh11 swdh19">
                                    <input className="prompt srch_explore" type="text" name="card[expire-year]" maxlength="4" placeholder="Year" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Expiration Year</label>
                                <div className="ui left icon input swdh11 swdh19">
                                    <input className="prompt srch_explore" type="text" name="card[cvc]" maxlength="3" placeholder="CVC" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default CreditTab;