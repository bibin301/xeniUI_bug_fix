import React from 'react';
import img_tick from '../../../asset/images/bookingConfirm/checked.png';
import img_share from '../../../asset/images/dashboard/socialClick.png';
import img_print from '../../../asset/images/dashboard/print.png';
import img_location from '../../../asset/images/Where Icon (Map Marker).svg';
import img_rating from '../../../asset/images/yellowStar4.png';
import img_clock from '../../../asset/images/Time.svg';
import img_arrow from '../../../asset/images/bookingConfirm/Shapearrow.png';
import img_hotel from '../../../asset/images/dashboard/hotelPic.jpg';
import img_DateArrow from "../../../asset/images/Date Arrow.png";
import img_extrabed from "../../../asset/images/selectRoom/extrabed.png";
import img_info from "../../../asset/images/information.png";
import img_user from '../../../asset/images/dashboard/carUser.png';
import img_xenni from '../../../asset/images/bookingConfirm/Xennies-Text-3D.png';
import img_help from "../../../asset/images/CVV Help.png";
import { map as _map } from "lodash";
import ImageCarousel from "../../../component/presentational/ImageCarousel";
import UserRating from "../../../component/presentational/UserRating";
import queryString from 'query-string';
import moment from "moment";
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom';
import Footer from '../../Footer';
import TopNav from '../TopNav';


class BookingConfirmation extends React.Component {
    state = { booking_result: {}, bookingArray: [] }

    rmvHtmlFunc = (str) => {
        if ((str === null) || (str === ''))
            return 'No Description Available';
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        const booking_result = this.props.paymentDetails.data.booking_result;
        const {
            line1,
            line2,
            city,
            countryCode,
            postalCode
        } = booking_result[0].bookingRequest.hotel_address.contact.address;
        const detailedAddress =
            line1 +
            ", " +
            line2 +
            ", " +
            city.name +
            ", " +
            countryCode +
            ", " +
            postalCode;
        const _danSTR = booking_result[0].bookingRequest.rooms_info[0].desc.split('<strong>')[0] === '<p>'
            ? booking_result[0].bookingRequest.rooms_info[0].desc
            : '<p>' + booking_result[0].bookingRequest.rooms_info[0].desc + '</p>';
        const values = queryString.parse(window.location.search)
        const stDt = moment(booking_result[0].bookingRequest.stayPeriod.start, "MM/DD/YYYY");
        const endDt = moment(booking_result[0].bookingRequest.stayPeriod.end, "MM/DD/YYYY");
        const stayDt = endDt.diff(stDt, "days");
        return (
            <React.Fragment>
            <TopNav onClick={this.props.onSignIn} />
            <section className="searchSection">
            <div className="container">
                <div className="bookingConfirmation">
                    <div className="bookingStatus">
                        <div className="d-flex flex-row smallTabColumn justify-content-between">
                            <div className="flex-column">
                                <div className="bookingStatusContent">
                                    <img src={img_tick} alt='tick' />
                                    <h3>Your Booking has Been Confirmed</h3>
                                </div>
                            </div>
                            <div className="flex-column">
                                <ul className="bookingShare">
                                    <li><img src={img_print} alt="print" /> Print</li>
                                    <li><img src={img_share} alt="Share" /> Share</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-row">
                            <div className="bookingHotelName">
                                <h5>{booking_result[0].bookingRequest.hotel_address.name}</h5>
                            </div>
                            <ul className="bookingHotelInfo">
                                <li className="borderRight">{moment(booking_result[0].bookingRequest.stayPeriod.start).format("dddd")}, {moment(booking_result[0].bookingRequest.stayPeriod.start)
                                    .format("MMM DD")
                                    .toUpperCase()}<img src={img_arrow} alt="arrow" />{moment(booking_result[0].bookingRequest.stayPeriod.end).format("dddd")}, {moment(booking_result[0].bookingRequest.stayPeriod.end)
                                        .format("MMM DD")
                                        .toUpperCase()}</li>
                                <li className="borderRight">Total Cost : $1225.45 </li>
                                <li> Itinerary #  4043529680</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bookingStatus">
                        <div className="d-flex flex-row smallTabColumn justify-content-between">
                            <div className="flex-column hotelImage">
                                {_map(booking_result, (each) => each.bookingRequest.images.length) ? (
                                    <ImageCarousel
                                        imageList={_map(booking_result[0].bookingRequest.images, each => ({
                                            name: each.imageCaption,
                                            url: each.URL
                                        })
                                        )}
                                    />
                                ) : (
                                        <ImageCarousel />
                                    )}
                            </div>
                            <div className="flex-column bookingConfirmRoom">
                                <div className="d-flex flex-row resWrap" >
                                    <div className="flex-column infoDiv">
                                        <div className="listTitle">
                                            <UserRating rating={booking_result[0].bookingRequest.rating} />
                                        </div>
                                        <h6>{booking_result[0].bookingRequest.hotel_address.name}</h6>
                                        <p>
                                            <img src={img_location} />
                                            <a target="_blank" rel="noreferrer">
                                                {detailedAddress}
                                            </a>
                                        </p>
                                        <span>Booking for {stayDt} Nights</span>
                                        <ul>
                                            <li className="border">
                                                <h5>  {moment(booking_result[0].bookingRequest.stayPeriod.start)
                                                    .format("MMM DD")
                                                    .toUpperCase()}</h5>
                                                <p>{moment(booking_result[0].bookingRequest.stayPeriod.start).format("dddd")}</p>
                                            </li>
                                            <li>
                                                <img src={img_DateArrow} />
                                            </li>
                                            <li className="border">
                                                <h5>{moment(booking_result[0].bookingRequest.stayPeriod.end)
                                                    .format("MMM DD")
                                                    .toUpperCase()}</h5>
                                                <p>{moment(booking_result[0].bookingRequest.stayPeriod.end).format("dddd")}</p>
                                            </li>
                                        </ul>
                                        <ul className="checkInOut">
                                            <li>
                                                <img src={img_clock} />
                                                <span>Check In<b>09.00AM</b></span>
                                            </li>
                                            <li>
                                                <img src={img_clock} />
                                                <span>Check Out <b>12.00AM</b></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex-column infoDiv">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172771.04389694938!2d-122.59110161474152!3d47.420765472217596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54904f7dd2ecdd31%3A0x1fb834a2a78665ec!2sVashon%2C+WA+98070%2C+USA!5e0!3m2!1sen!2sin!4v1548763725521" style={{ width: "200px", height: '92px', border: '1px solid rgb(106, 106, 106)', marginLeft: '15px' }}></iframe>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="flex-column">
                                        <button type="button" className="searchBtn mr-2">CHANGE BOOKING </button>
                                        <button type="button" className="searchBtn secondryBg"><NavLink style={{ textDecoration: 'none', color: '#fff' }} to="/dashboard/my-trips">CANCEL BOOKING</NavLink></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5>Check-In / Check-Out</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row smallTabColumn justify-content-start">
                                <div className="flex-column checkDiv">
                                    <h6>Check-In Time</h6>
                                    <p>12:00pm</p>
                                </div>
                                <div className="flex-column checkDiv">
                                    <h6>Check-Out Time</h6>
                                    <p>09:00pm</p>
                                </div>
                            </div>
                            <div className="flex-row">
                                <div className="flex-column">
                                    <h6>Check-In Policy</h6>
                                    <p>{this.rmvHtmlFunc(booking_result[0].bookingRequest.policies[0].text)}</p>

                                </div>
                            </div>
                            <div className="flex-row">
                                <div className="flex-column">
                                    <h6>Special instructions</h6>
                                    <p>{this.rmvHtmlFunc(booking_result[0].bookingRequest.policies[3].text)}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5>Room Details</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row smallTabColumn justify-content-start">
                                <div className="flex-column RoomDiv">
                                    <div className="roomImage">
                                        {_map(booking_result, (each) => each.bookingRequest.images.length) ? (
                                            <ImageCarousel
                                                imageList={_map(booking_result[0].bookingRequest.images, each => ({
                                                    name: each.imageCaption,
                                                    url: each.URL
                                                })
                                                )}
                                            />
                                        ) : (
                                                <ImageCarousel />
                                            )}</div>
                                </div>
                                <div className="flex-column RoomDiv">
                                    <div className="roomInfo">
                                        <h6>Guest</h6>
                                        <p>Reserved Under {booking_result[0].bookingRequest.rooms[0].guests[0].name.first} {booking_result[0].bookingRequest.rooms[0].guests[0].name.last}</p>
                                        <p>{values.adult} Adult, {values.child} Child</p>
                                    </div>
                                    <div className="roomInfo">
                                        <h6>Room Type</h6>
                                        <p>{booking_result[0].bookingRequest.rooms_info[0].name}</p>
                                        <p>{values.adult} Adult, {values.child} Child</p>
                                        <ul className="roomType">
                                            <li>
                                                <img src={img_extrabed} alt="room bed" />
                                                <p>
                                                    <b>{booking_result[0].bookingRequest.rooms_info[0].bedDetails[0].type}</b>
                                                    <span>(Extra bed available)</span>
                                                </p>
                                            </li>
                                            <li>
                                                <img src={img_user} alt="room User" />
                                                <p>
                                                    <b>Sleeper 2 Guest</b>
                                                    <span>(Upto 2 Children)</span>
                                                </p>
                                            </li>
                                        </ul>
                                        {booking_result[0].bookingRequest.rooms_info[0].desc ? <span style={{ marginLeft: '10px', color: '#006DF0' }}><img src={img_info} style={{ width: '16px' }} alt="" /> More Details  <div className="moreDetailToolTip" dangerouslySetInnerHTML={{ __html: _danSTR }}></div></span> : null}
                                    </div>
                                    <div className="roomInfo">
                                        <h6>Room Request</h6>
                                        <p>Non-smoking Room</p>
                                    </div>
                                </div>
                                <div className="flex-column RoomDiv">
                                    <h6>Included Amenities</h6>
                                    <p>{booking_result[0].bookingRequest.amenities[0].name}</p>
                                    <p>{booking_result[0].bookingRequest.amenities[1].name}</p>
                                    <p>{booking_result[0].bookingRequest.amenities[2].name}</p>
                                    <p>{booking_result[0].bookingRequest.amenities[3].name}</p>
                                    <p>{booking_result[0].bookingRequest.amenities[4].name}</p>


                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5>Price Summary & Rewards</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row smallTabColumn justify-content-start">
                                <div className="flex-column checkDiv">
                                    <ul className="totalAmountDis">
                                        <li>
                                            <span>Standard Room, 1 king</span>
                                            <span>$150/night</span>
                                        </li>
                                        <li>
                                            <span> 7 Nights</span>
                                            <span>$ 175.25</span>
                                        </li>
                                        <li>
                                            <span>Taxes & Fees</span>
                                            <span>$175.25</span>
                                        </li>

                                        <li>
                                            <span>Total Cost</span>
                                            <span>$ 1225.25</span>
                                        </li>
                                    </ul>
                                    <p>Taxes and fees included, except VAT. Local citizens must pay VAT at the hotel. Foreigners may be exempt.
                                    Unless specified otherwise, rates are quoted in US dollars. </p>
                                </div>
                                <div className="flex-column checkDiv">
                                    <h6>Xeniapp Rewards</h6>
                                    <div className="poweredBy">
                                        <span>Powered By</span>
                                        <img src={img_xenni} alt="xenni coin" />
                                    </div>
                                    <div className="earnedXeni">
                                        <p>You Earned</p>
                                        <h2>120 Xennies</h2>
                                        <p>on Trip</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5>Rules & Restrictions</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row justify-content-start">
                                <div className="flex-column">
                                    <h6>Cancellations and Changes</h6>
                                    <p>{booking_result[0].bookingRequest.cancellationPolicy.text}</p>
                                    <h6>Pricing and Payment</h6>
                                    <p>{booking_result[0].bookingRequest.policies[2].text}</p>
                                    <h6>Guest Charges and Room Capacity</h6>
                                    <p>{booking_result[0].bookingRequest.policies[3].text}</p>
                                    <p>{this.rmvHtmlFunc(booking_result[0].bookingRequest.rooms_info[0].desc)}</p>
                                    <h6>Room Confirmations</h6>
                                    <p>Some hotels request that we wait to submit guest names until 7 days prior to check in. In such a case, your hotel room is reserved, but your name is not yet on file with the hotel.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5>Additional Hotel Fees</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row justify-content-start">
                                <div className="flex-column">
                                    <h6>The below fees and deposits only apply if they are not included in your selected room rate.</h6>
                                    <p>You'll be asked to pay the following charges at the property:</p><br />
                                    <p>Deposit: USD 100 per stay</p>
                                    <p>We have included all charges provided to us by the property. However, charges can vary, for example, based on length of stay or the room you book.</p>
                                    <p>The price shown above DOES NOT include any applicable hotel service fees, charges for optional incidentals (such as minibar snacks or telephone calls), or regulatory surcharges. The hotel will assess these fees, charges, and surcharges upon check-out.</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="bookingCollapse">
                        <div className="bookingCollapseTitle">
                            <h5><img src={img_help} alt="help" /> Need more Help ?</h5>
                        </div>
                        <div className="bookingCollapseContent">
                            <div className="d-flex flex-row justify-content-start">
                                <div className="flex-column">
                                    <ul className="needHelp">
                                        <li>Visit our <a href="">Help Desk</a> Page.</li>
                                        <li>Xeniapp Customer Care at <b>(929) 279-2195</b>.</li>
                                        <li>For more efficient support remember your <b>Itinerary # 4043529680</b></li>

                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </section>
            <Footer/>
            </React.Fragment>
        
        );
    }
}
const mapStateToProps = state => ({
    paymentDetails: state.paymentReducer.paymentDetails
});
const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingConfirmation));
