import React, { Component } from 'react';
import './payment.css';


class Payment extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

   
    render() {
        return (
          <div>
              <div className="pay-width">
              <div className="pay-tabs">
					<h2>Select Payment Method</h2>
					<ul className="resp-tabs-list">
					   <li className="resp-tab-item resp-tab-active" aria-controls="tab_item-0" role="tab"><span><label className="pic1"></label>Credit Card</span></li>
						<li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span><label className="pic3"></label>Net Banking</span></li>
						<li className="resp-tab-item" aria-controls="tab_item-2" role="tab"><span><label className="pic4"></label>PayPal</span></li> 
						<li className="resp-tab-item" aria-controls="tab_item-3" role="tab"><span><label className="pic2"></label>Debit Card</span></li>
						<div className="clear"></div>
					</ul>	
			  </div>
              </div>
              <div className="pay-width">
                  <div className="pay-choose">
                    <div className="payment-info">
						<h3>Personal Information</h3>
						<form className="pay-form">
												<div className="tab-for">				
													<h5>EMAIL ADDRESS</h5>
														<input type="text" value=""/>
													<h5>FIRST NAME</h5>													
														<input type="text" value=""/>
												</div>			
											</form>
						<h3 className="pay-title">Credit Card Info</h3>
						<form className="pay-form">
												<div className="tab-for">				
													<h5>NAME ON CARD</h5>
														<input type="text" value=""/>
													<h5>CARD NUMBER</h5>													
														<input className="pay-logo" type="text" value="0000-0000-0000-0000" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '0000-0000-0000-0000';}" required=""/>
												</div>	
												<div className="transaction">
													<div className="tab-form-left user-form">
														<h5>EXPIRATION</h5>
															<ul className="pay-val">
																<li>
																	<input type="number" className="text_box" value="6" min="1"/>
																</li>
																<li>
																	<input type="number" className="text_box" value="1988" min="1"/>
																</li>
																
															</ul>
													</div>
													<div className="tab-form-right user-form-rt">
														<h5>CVV NUMBER</h5>													
														<input type="text" value="xxxx" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'xxxx';}" required=""/>
													</div>
													<div className="clear"></div>
												</div>
												<input type="submit" value="SUBMIT"/>
											</form>
						
				    </div>
                    </div>
              </div>
             
          </div>
        )
    }
}

export default Payment;