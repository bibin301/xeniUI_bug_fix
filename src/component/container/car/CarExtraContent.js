import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import img_carLogo from '../../../asset/images/car/carlogo.png';
import img_carImg from '../../../asset/images/car/carImg.png';
import img_carUser from '../../../asset/images/dashboard/carUser.png';
import img_door from '../../../asset/images/dashboard/door.png';
import img_luggage from '../../../asset/images/dashboard/luggage.png';
import openNewTab from "../../../asset/images/dashboard/resize.png";
import img_info from '../../../asset/images/Important Information.svg'

class CarExtraContent extends Component{

    reserveHandle = () =>{
        console.log("confirm");
        this.props.history.push('/car/confirm');
    }
    render(){
        return(
            <div className="selectRoomBg d-flex flex-wrap">
            <div className="selectRoomTitle">
                <h4>Select Extras <img src={openNewTab} /></h4>

            </div>
            <div className="selectRoomItemsBg carSelRoom">
                        <div className="d-flex flex-row smallColumn  carCard">
                                <div className="flex-column carImgDiv align-self-center">
                                <img src={img_carLogo} className="carLogoWidth"/>
                                    
                                    <div className="carImageOnly"><img src={img_carImg} className="carImgWid"/></div>
                                   <div className="carInfoDiv">
                                        <img src={img_info} />
                                       <p> Important Information about your rental</p>
                                    </div>
                                </div>
                                
                                <div className="detailsBg flex-column carInfo">
                                    
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
        
                                              <ul className="pickupDropDet">
                                                  <li>
                                                      <h6>Pick-Up</h6>
                                                      <p>La Guardia Airport 45-01 20th avenu,Astroia,New York,USA 11105</p>
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
                                                        <p>La Guardia Airport 45-01 20th avenu,Astroia,New York,USA 11105</p>
                                                    </li>
                                                    <li><h6>Hours of Operation</h6>
                                                        <p>12.00am - 11.59pm</p>
                                                    </li>
                                              </ul>
                                    
                            </div>
                                <div className="rateShowDiv flex-column">
                                
                                    <div className="priceDiv">
                                        <strike>$36</strike>
                                        <h2>$25</h2>
                                        <p>per day</p>
                                    </div>
                                    <p>Total :$150.00</p>
                                    
                                </div>
                            </div>
               
                <div className="accessoriesCarDetails">
                    <p><b>Accessories </b>(Accessories are available at additional cost, requests are subject to availability)</p>
                    <div className="d-flex flex-row smallColumn ">
                        <div className='flex-column accessItems'>
                            <ul>
                                <li><span className="checkText">GPS</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch1" /><label for="switch1"></label><span>Yes</span></span></li>
                                <li><span className="checkText">Ski Rack</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch2" /><label for="switch2"></label><span>Yes</span></span></li>
                                <li><span className="checkText">Infant Seat</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch3" /><label for="switch3"></label><span>Yes</span></span></li>
                                <li><span className="checkText">Toddler Seat</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch4" /><label for="switch4"></label><span>Yes</span></span></li>
                                
                            </ul>
                        </div>
                        <div className='flex-column accessItems'>
                                <ul>
                                    <li><span className="checkText">Additional Driver</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch5" /><label for="switch5"></label><span>Yes</span></span></li>
                                    <li><span className="checkText">Snow tries</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch6" /><label for="switch6"></label><span>Yes</span></span></li>
                                    <li><span className="checkText">E-Zpass</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch7" /><label for="switch7"></label><span>Yes</span></span></li>
                                    <li><span className="checkText">Collision Damage Coverage</span> <span className="checkYesorNo"><span>No</span><input type="checkbox" id="switch8" /><label for="switch8"></label><span>Yes</span></span></li>
                                </ul>
                                
                        </div>
                    </div>
                </div>
                <div className="text-right">

                <button type="button" className="selectRoomBtn reserveBtn" onClick={this.reserveHandle}>BOOK NOW</button>
                </div>
            </div>
        </div>
        );
    }
}export default CarExtraContent;