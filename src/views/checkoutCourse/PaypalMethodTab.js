import React from 'react'
import pyicon from "../../images/membership/pyicon-1.svg";
// paypal method tab for course check out page
function PaypalMethodTab() {
    return (
        <><div className="row">
            <div className="col-md-12">
                <p className="t-body">After payment via PayPal's secure checkout, we will send you a link to download your files.</p>
                <div className="media h-mt2">
                    <div className="media__item -align-center">
                        <p className="t2-body h-m0">PayPal accepts</p>
                    </div>
                    <div className="media__body">
                        <ul id="paypal-gateway" className="financial-institutes">
                            <li className="financial-institutes__logo">
                                <img alt="Visa" title="Visa" src={pyicon} />
                            </li>
                            <li className="financial-institutes__logo">
                                <img alt="MasterCard" title="MasterCard" src={pyicon} />
                            </li>
                            <li className="financial-institutes__logo">
                                <img alt="American Express" title="American Express" src={pyicon} />
                            </li>
                            <li className="financial-institutes__logo">
                                <img alt="Discover" title="Discover" src={pyicon} />
                            </li>
                            <li className="financial-institutes__logo">
                                <img alt="China UnionPay" title="China UnionPay" src={pyicon} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PaypalMethodTab