import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Footer from '../../Footer';
import TopNav from '../TopNav';
import {map as _map} from 'lodash';
import moment from "moment";
import PropTypes from "prop-types";

import { cancelledBooking } from "../../../service/dashboard/action"
import ImageCarousel from "../../presentational/ImageCarousel";
import SignIn from "../../../component/container/login/SignInModal"

import img_location from '../../../asset/images/Where Icon (Map Marker).svg';
import img_clock from '../../../asset/images/Time.svg';
import img_arrow from '../../../asset/images/bookingConfirm/Shapearrow.png';
import img_hotel from '../../../asset/images/dashboard/hotelPic.jpg';
import img_DateArrow from "../../../asset/images/Date Arrow.png";
import img_call from "../../../asset/images/bookingConfirm/call-answer.png";
import img_Date from "../../../asset/images/Date Arrow.png";

class CancelBooking extends React.Component {

    state ={
        selectedValue:"",

  
    }
 
  
    componentWillReceiveProps(nextPorps) {
        console.log("nextPorps" ,nextPorps)
        if(nextPorps.cancelledConfirm === true){
        this.props.history.push('/CancelledBooking')
        }
    }
    

    handleSignIn = () => {

       this.setState({ isVisibleSignIn: true });
       this.setState({ isdivHide: true });
    };

    getSelectValue =(e) =>{
        
      this.setState({selectedValue:e.target.value})

    }

    bookingCancelation = (flag ,value) =>{
   
       
        const { loginDetails ,refundList ,cancelRouteInfo} = this.props;
     
         if(flag === true){

            if(value.refundability === "Refundable"){

                 const payLoad = {
                    "bookingId": value.bookingId,
                    "email":loginDetails.email ||"",
                    "reason":this.state.selectedValue ||"",
                    "penality_rules": refundList? refundList.data.penality_rules:"",
                    "refund_amount": refundList? refundList.data.refund_amount : ""
                 }

                this.props.cancelledBooking(payLoad);
                //this.props.history.push("/CancelledBooking")
            }else if(value.refundability === "NonRefundable"){
            
                const payLoad = {
                    "bookingId": value.bookingId,
                    "email":loginDetails.email ||"",
                    "reason":this.state.selectedValue ||"",
                    "penality_rules": "",
                    "refund_amount": ""
                 }
                 this.props.cancelledBooking(payLoad);
                //this.props.history.push("/CancelledBooking")
            }
             
         }
  
    }


  render() {
    
    const {cancelRouteInfo , refundList} = this.props;
      
    var date1 = new Date(cancelRouteInfo.stayPeriod.start);
    var date2 = new Date(cancelRouteInfo.stayPeriod.end);
    var stayPeriod = date2.getDate() - date1.getDate(); 

     
return (
      
 <React.Fragment>
    
  <TopNav isSignUpHide={this.state.isSignCancel} onClick={this.props.onSignIn} />
        
    <section className="searchSection">
     
        <div className="container">

            <div className="bookingConfirmation">
                <div className="bookingStatus">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="flex-column">
                            <div className="bookingStatusContent cancelBook">
                                <h3>Cancel this Hotel Booking</h3>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="bookingHotelName">
                        <h5>{cancelRouteInfo.hotel_address.name ? cancelRouteInfo.hotel_address.name : "null"}</h5>
                            
                        </div>
                        <ul className="bookingHotelInfo">
                        
                            <li className="borderRight"> {moment(cancelRouteInfo.stayPeriod.start)
                                                            .format("MMM DD")
                                                            .toUpperCase()} {moment(cancelRouteInfo.stayPeriod.start).format("dddd")} <img src={img_Date} alt="arrow"/>  {moment(cancelRouteInfo.stayPeriod.end)
                                                            .format("MMM DD")
                                                            .toUpperCase()} {moment(cancelRouteInfo.stayPeriod.end).format("dddd")}</li>
                            <li className="borderRight">Total Cost : ${parseFloat(cancelRouteInfo.totalAmount).toFixed(2)} </li>
                            <li> Itinerary #  {cancelRouteInfo.bookingId}</li>
                        </ul>
                    </div>
               </div>
            <div className="bookingStatus">
                <div className="d-flex flex-row smallTabColumn justify-content-between">
                    <div className="flex-column hotelImage">
                        
                        <img src={cancelRouteInfo.hotel_images[0].URL} alt="hotelImage"/>
                        
                    </div>
                    <div className="flex-column bookingConfirmRoom">
                        <div className="d-flex flex-row">
                            <div className="flex-column infoDiv cancebookName">
                                    
                                    <h6>{cancelRouteInfo.hotel_address.name}</h6>
                                    <p>
                                        <img src={img_location} />
                                        <a  target="_blank" rel="noreferrer">
                                        {cancelRouteInfo.hotel_address.contact.address.city.name} 
                                        </a>
                                    </p>
                {/* <p><img src={img_call} /> <b>(212) 586-7000</b></p><br/> */}
                
                <span>Booking for {stayPeriod}  Nights</span>
                                <ul>
                                    <li className="border">
                                        <h5>{moment(cancelRouteInfo.stayPeriod.start)
                                                                            .format("MMM DD")
                                                                            .toUpperCase()}</h5>
                                        <p>{moment(cancelRouteInfo.stayPeriod.start).format("dddd")} </p>
                                    </li>
                                    <li>
                                        <img src={img_DateArrow} />
                                    </li>
                                    <li className="border">
                                        <h5>{moment(cancelRouteInfo.stayPeriod.end)
                                                                            .format("MMM DD")
                                                                            .toUpperCase()}</h5>
                                        <p>{moment(cancelRouteInfo.stayPeriod.end ).format("dddd")} </p>
                                    </li>
                                </ul>
                                <ul className="checkInOut">
                                <li>
                                    <img src={img_clock} />
                                    <span>Check In<b>  {cancelRouteInfo.checkinCheckoutPolicy.length
                                                                            ? cancelRouteInfo.checkinCheckoutPolicy[0].inTime
                                                                            : "12.00am"}</b></span>
                                </li>
                                <li>
                                    <img src={img_clock} />
                                    <span>Check Out <b> {cancelRouteInfo.checkinCheckoutPolicy.length
                                                                            ? cancelRouteInfo.checkinCheckoutPolicy[0].outTime
                                                                            : "06.00pm"} </b></span>
                                </li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
             </div>

            <div className="bookingCollapse cancelBookCollapse marginRight">
                <div className="bookingCollapseTitle">
                    <h5>Guest</h5>
                </div>
                <div className="bookingCollapseContent">
                    <div className="d-flex flex-row justify-content-start">
                        <div className="flex-column ">
                            <p>Reserved Under <b>{cancelRouteInfo.hotel_address.contact.address.city.name}</b></p>
                            {/* <p>1 Adult, 1 Child</p> */}
                        </div>
                    </div>
                    
                </div>
            </div> 
            <div className="bookingCollapse cancelBookCollapse">
                <div className="bookingCollapseTitle">
                    <h5>Room</h5>
                </div>
                <div className="bookingCollapseContent">
                    <div className="d-flex flex-row justify-content-start">
                        <div className="flex-column ">
                                <p> {cancelRouteInfo.rooms_info[0].name} </p>
                        </div>
                    </div>
                    
                </div>
            </div> 
            <div className="bookingCollapse">
                <div className="bookingCollapseTitle">
                    <h5>CANCEL BOOKING</h5>
                </div>
                <div className="bookingCollapseContent">
                    <div className="d-flex flex-row justify-content-start">
                        <div className="flex-column ">
                                <h6>Hotel Cancellation Policy</h6>
                                <p> {cancelRouteInfo.cancellationPolicy.text}</p>
                                <div className="totalBookingCost d-flex justify-content-between">
                                <h5>TOTAL BOOKING COST :</h5>
                                
                                <p> {parseFloat(cancelRouteInfo.totalAmount).toFixed(2)}</p>
                                
                            </div>
                            <div className="totalBookingCost d-flex justify-content-between">
                                                        
                                <h5>REFUNDABLE AMOUNT :</h5>
                                <p> {refundList.data?  parseFloat(refundList.data.refund_amount).toFixed(2):"$ 0.00"} </p>


                           {/* {cancelRouteInfo.refundability === "Refundable" ? <p> $  { parseFloat(refundList.data.refund_amount).toFixed(2)}</p>:"0.00" }  */}
                            </div>
                            <p>Please provide a reason for the cancellation</p>
                        
                            <select className="form-control"  onChange={this.getSelectValue}>
                            <option value="">Select Reason</option>
                                <option value="duplicate">Duplicate</option>
                                <option value="fraudulent">Fraudulent</option>
                                <option value="requested_by_customer">Requested by Customer</option>
                            
                            </select>
                            <div className="flex-row">
                                <button type="submit" className="searchBtn mr-2" onClick={() => this.bookingCancelation(true ,cancelRouteInfo)} > CANCEL BOOKING </button>
                                {/* <a href="">KEEP BOOKING</a> */}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> 

                        
        </div>
     </div>
    <Footer/>

     </section>
    </React.Fragment>);
  }
}

const mapStateToProps = state => ({
    cancelRouteInfo: state.dashboardReducer.cancelRouteInfo,
    refundList: state.dashboardReducer.refundList,
    loginDetails: state.loginReducer.loginDetails,
    cancelledConfirm: state.dashboardReducer.cancelledConfirm
  
  });
  
  const mapDispatchToProps = dispatch => ({
    cancelledBooking: (data) => dispatch(cancelledBooking(data))
  });

 export default connect(mapStateToProps, mapDispatchToProps)(CancelBooking);




