import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import img_car from '../../../asset/images/car/carImg.png';
import img_logo from '../../../asset/images/car/carlogo.png';
import img_carUSer from '../../../asset/images/dashboard/carUser.png'
import img_carDoor from '../../../asset/images/dashboard/door.png'
import img_carLuggage from '../../../asset/images/dashboard/luggage.png';

class CarCard extends Component {
	carCardSelect = () =>{
		
		 console.log("log")
	   this.props.history.push('/car/extra');
		 }

render(){
    return(
        <div className="sectionCard carCard">
												<div className="d-flex flex-row smallColumn">
													<div className="flex-column carImgDiv align-self-center">
														<img src={img_car} className="carImgWid"/>
														<img src={img_logo} className="carLogoWidth"/>
													</div>
													
													<div className="detailsBg flex-column carInfo">
														
																	<h4>Hyundai Santa Fe</h4>
																	<ul className="carCategories">
																		<li>Standard SUV</li>
																		<li>Ultimate Mileage</li>
																	</ul>
																	{/* <h6> , Chevy Equinox or similar</h6> */}
																  <ul className="carInfraStru">
																	  <li>
																		<img src={img_carUSer}/> 5
																	  </li>
																	  <li>
																		 <img src={img_carDoor}/> 4
																	  </li>
																	   <li>
																		  <img src={img_carLuggage}/> 3
																		</li>
																  </ul>
							
																  <ul className="pickupDropDet">
																	  <li>
																		  <h6>Pick-Up</h6>
																		  <p>La Guardia Airport,La Guardia Airport</p>
																		  <p>(10.30am)</p>
																	  </li>
																	  <li>
																			<h6>Drop-Off</h6>
																			<p>Same as Pickup</p>
																			<p>(12.30pm)</p>
																			
																		</li>
																  </ul>
														
												</div>
													<div className="rateShowDiv flex-column">
													
														<div className="priceDiv">
															<strike>$680</strike>
															<h2>$420</h2>
															<p>per day</p>
														</div>
														<p className="totalAmt">Total :$150.00</p>
														<button type="button" className="selectRoomBtn" onClick={this.carCardSelect}>Select</button>
													</div>
												</div>
													
											</div>
        );
}
}export default withRouter(CarCard);