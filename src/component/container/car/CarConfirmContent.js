import React ,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import img_carLogo from '../../../asset/images/car/carlogo.png';
import img_carImg from '../../../asset/images/car/carImg.png';
import img_carUser from '../../../asset/images/dashboard/carUser.png';
import img_door from '../../../asset/images/dashboard/door.png';
import img_luggage from '../../../asset/images/dashboard/luggage.png';
import openNewTab from "../../../asset/images/dashboard/resize.png";
import img_info from '../../../asset/images/Important Information.svg';
import img_DateArrow from "../../../asset/images/Date Arrow.png";
import img_Time from "../../../asset/images/Time.svg";
class CarConfirmContent extends Component{

    render(){
        return(
                    <div className="selectRoomBg d-flex flex-wrap">
											<div className="selectRoomTitle">
												<h4>Review & Confirm your reservation <img src={openNewTab} /></h4>
											</div>
											<div className="selectRoomItemsBg carSelRoom d-flex flex-row smallColumn ">
												<div className="flex-column  carConfirmLeft">
													<div className="carConfirmImgDiv">
														<img src={img_carLogo} className="carLogoWidth"/>
													<div className="carImageOnly"><img src={img_carImg} className="carImgWid"/></div>
													
														
													</div>
													<div className="confirmScreenPick">
													<ul className="pickupDropDet">
																  <li>
																	  <h6>Pick-Up</h6>
																	  <p>La Guardia Airport</p>
																  </li>
																  <li><h6>Hours of Operation</h6>
                                                        <p>12.00am - 11.59pm</p>
                                                    </li>
                                                    <li><h6>Shuttle to counter and car</h6>
                                                        <p>Free shuttle to the rental car counter and car loacted off the airport</p>
                                                    </li>
													</ul>
													<ul  className="pickupDropDet">
															<li>
																		<h6>Drop-Off</h6>
																		<p>Same as Pickup</p>
																	</li>
																	<li><h6>Hours of Operation</h6>
                                                        		<p>12.00am - 11.59pm</p>
                                                   			 </li>
													</ul>
												</div>
												</div>
												<div className="flex-column confirmRoomRight carConfirmRight">
												<div className="carInfo">
													
																<h4>Standard SUV</h4>
																<h6> Hyundai Santa Fe, Chevy Equinox or similar</h6>
															  <ul className="carInfraStru">
																  <li>
																	<img src={img_carUser}/> 5
																  </li>
																  <li>
																	 <img src={img_door}/> 4
																  </li>
																   <li>
																	  <img src={img_luggage}/> 3
																	</li>
															  </ul>
						
															 
														 </div>
														 <p>Booked for 6 Days</p>
														<ul>
															<li className="border"><h5>20 OCT </h5><p>Saturday</p></li>
															<li><img src={img_DateArrow}/></li>
															<li className="border"><h5>26 OCT </h5><p>Friday</p></li>
														</ul>
														<ul className="checkInOut">
															<li><img src={img_Time}/><span>Check In <b>12.00pm</b></span></li>
															<li><img src={img_Time}/><span>Check Out <b>06.00pm</b></span></li>
														</ul>
														<div className="carInfoDiv">
															<img src={img_info} /> 
															<p>Important Information about your rental</p>
													 	</div>
												</div>
												<div className="flex-column confirmRoomRight carConfirmRight">
													
														<ul className="totalAmountDis">
															
															<li><span><b>ADD ON</b> GPS Navigational Device</span><span>$60</span></li>
															<li><span>Standard Room, 1 King</span> <span>$150/night</span></li>
															<li><span>7 Nights</span> <span>$1050.00</span></li>
															<li><span>Taxes & Fees</span> <span>$175.45</span></li>
															<li><span>Total Cast</span> <span>$1225.45</span></li>
														</ul>
														
													<h6>Reservation & Cancellation Policy  <i className="fas fa-angle-double-down"></i></h6>
													<p>Drivers under 25 or over 70 years of age may need to pay an extra fee. For additional driver charges, mileage and fuel policy, extra hours or other important information, read <a href="">rules and restrictions <img src={openNewTab} className="resizeImg"/></a>
														</p>
														{/* <div className="mt-2">
															<button type="button" className="searchBtn addIteinary">Add to Itinerary</button>
															<button type="button" className="searchBtn continueBook">Continue Booking</button>
														</div> */}
													</div>
												
											</div>
									</div>
        );
    }

}export default withRouter(CarConfirmContent);