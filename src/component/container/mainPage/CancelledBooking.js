import React from 'react';
import { connect } from "react-redux";
import moment from "moment";

import img_location from '../../../asset/images/Where Icon (Map Marker).svg';
import img_clock from '../../../asset/images/Time.svg';
import img_arrow from '../../../asset/images/bookingConfirm/Shapearrow.png';
import img_hotel from '../../../asset/images/dashboard/hotelPic.jpg';
import img_DateArrow from "../../../asset/images/Date Arrow.png";
import img_close from "../../../asset/images/bookingConfirm/close.png";
import img_print from '../../../asset/images/dashboard/print.png';

import img_call from "../../../asset/images/bookingConfirm/call-answer.png";
import img_hotelBuild from '../../../asset/images/hotel-building.png';
import img_search from '../../../asset/images/search.png';
import Footer from '../../Footer';
import TopNav from '../TopNav';

 class CancelledBooking extends React.Component {

 
    print = (event) => {
        event.preventDefault();
        window.print();
    }

  render() {
      const {  loginDetails ,refundList ,cancelledBookingInfo} = this.props;
    
      const cancelRouteInfo = cancelledBookingInfo.data.result
      //Todo
    //   console.log("cancelledInfo", cancelRouteInfo)
    //   console.log("refundList-cancelled" , refundList)
      var date1 = new Date(cancelRouteInfo.stayPeriod.start);
      var date2 = new Date(cancelRouteInfo.stayPeriod.end);
      var stayPeriod = date2.getDate() - date1.getDate(); 

    return (
        <React.Fragment>
        <TopNav onClick={this.props.onSignIn} />
        <section className="searchSection">
        <div className="container">
            <div className="bookingConfirmation">
            <div className="bookingStatus">
                      <div className="d-flex flex-row smallTabColumn justify-content-between">
                        <div className="flex-column">
                            <div className="bookingStatusContent cancelledBook">
                            <img src={img_close} alt='close'/>
                                <h3>{cancelledBookingInfo.data.message}</h3>
                            </div>
                        </div>
                        <div className="flex-column">
                            <ul className="bookingShare">
                                <li><img src={img_print} onClick={this.print} alt="print"/> Print</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="bookingHotelName">
                        {/* <h5>{hotelName}</h5> */}
                        </div>
                        <li className="borderRight"> {moment(cancelRouteInfo?cancelRouteInfo.stayPeriod.start:"")
                                                            .format("MMM DD")
                                                            .toUpperCase()} {moment(cancelRouteInfo?cancelRouteInfo.stayPeriod.start:"").format("dddd")} <img src={img_DateArrow} alt="arrow"/>  {moment(cancelRouteInfo.stayPeriod.end)
                                                            .format("MMM DD")
                                                            .toUpperCase()} {moment(cancelRouteInfo?cancelRouteInfo.stayPeriod.end:"").format("dddd")}</li>
                            <li className="borderRight">Total Cost : ${ parseFloat(cancelRouteInfo.totalAmount).toFixed(2)} </li>
                            <li> Itinerary #  {cancelRouteInfo.bookingId}</li>
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
                                        
                                        <h6>{cancelRouteInfo && cancelRouteInfo.hotel_address.name === undefined ? "" : cancelRouteInfo.hotel_address.name}</h6>
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
                                 <p> {cancelRouteInfo.rooms_info[0].name}</p>
                               
                            </div>
                        </div>
                       
                    </div>
                 </div> 
                 <div className="bookingStatus">

                            <h5>Your Hotel Room has been Cancelled</h5>
                            <p><b>New York Hilton - Midtown</b> has charged you a cancellation fee of  - <b>{cancelRouteInfo.refundability === "Refundable" ? <b>  ${ parseFloat(refundList.data.refund_amount).toFixed(2)}</b>:"0.00" } </b></p><br/>
                            <p className="text-center">We have sent a confirmation of the cancellation to: <b>{loginDetails.email}</b></p><br/>
                            {/* <div className="d-flex flex-row smallColumn justify-content-center" >
                                <button type="button" className="defaultBtnBook"> <img src={img_hotelBuild} alt="hotel"/>REBOOK AT THIS HOTEL</button>
                                <button type="button" className="defaultBtnBook"><img src={img_search}  alt="search"/> SEARCH HOTELS IN NEW YORK </button>
                            </div> */}
                     
                </div>

            </div>
        </div>
        <Footer/>
        </section>
        </React.Fragment>);
  }
}

// export default CancelledBooking;

const mapStateToProps = state => ({
    cancelRouteInfo: state.dashboardReducer.cancelRouteInfo,
    refundList:state.dashboardReducer.refundList,
    loginDetails: state.loginReducer.loginDetails,
    cancelledBookingInfo: state.dashboardReducer.cancelledBookingInfo
  
  });
  
 export default connect(mapStateToProps, null)(CancelledBooking);