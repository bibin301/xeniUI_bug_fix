import React, { Component } from 'react';
import { map as _map } from "lodash";
import moment from "moment";

import ImageCarousel from "../../component/presentational/ImageCarousel";
import openNewTab from "../../asset/images/dashboard/resize.png";
import img_discount from '../../asset/images/discount.png';
import img_noSmoke from '../../asset/images/no-smoking-sign (1).png';
import img_reserve from "../../asset/images/online-booking.png";
import img_close from '../../asset/images/cancel.png';
import img_tick from '../../asset/images/roundTick.png';
import img_extrabed from "../../asset/images/selectRoom/extrabed.png";
import img_hotel from "../../asset/images/hotel-building.png";
import img_signal from "../../asset/images/selectRoom/signal.png";
import img_Time from "../../asset/images/Time.svg";
import img_DateArrow from "../../asset/images/Date Arrow.png";
import img_WhereIcon from "../../asset/images/Where Icon (Map Marker).svg";
import UserRating from "./UserRating";
import img_hotcoffee from "../../asset/images/selectRoom/hot-coffee.png";
import img_television from "../../asset/images/television.png";

class RoomResInfo extends Component {
  state = {}
  render() {
    const {
      hotel,
      checkin,
      checkout,
      fareBreakup,
      room,
      checkinCheckoutPolicy,
      isCancellation,
      cancellationPolicy,
      togglecancellation,
      toggleSplCancel,
      isSpclIns,
      policy,
      rate,
      totalAmount,
      farebreakupAmount,
      selectedRoomCount,
      roomDesc,
      rmvHtmlFunc } = this.props;
    const locationRef = `https://maps.google.com/?q=${hotel.geocode.lat},${
      hotel.geocode.long
      }`;
    const {
      line1,
      line2,
      city,
      countryCode,
      postalCode
    } = hotel.contact.address;
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
    // const { checkin, checkout } = this.props.bookingDate;
    const stDt = moment(checkin, "MM/DD/YYYY");
    const endDt = moment(checkout, "MM/DD/YYYY");
    const stayDt = endDt.diff(stDt, "days");
    const taxAmount = fareBreakup.taxes.length > 0 ? fareBreakup.taxes[0].amount : 0;
    const roomDescription = room[0].desc ? room[0].desc.split('<p>') : "";
    console.log('hdksjfjasd', totalAmount, roomDesc, totalAmount * selectedRoomCount[roomDesc])
    return (
      <div className="selectRoomItemsBg d-flex flex-row resWrap">
        <div className="flex-column confirmRoomLeft">
          {hotel.images.length ? (
            <ImageCarousel
              imageList={_map(hotel.images, each => ({
                name: each.imageCaption,
                url: each.URL
              }))}
            />
          ) : (
              <ImageCarousel />
            )}
          <div className="d-flex flex-row">
            <div className="flex-column">
              <ul>
                {rate.refundability == 'Refundable' ?
                  <React.Fragment>
                    <li><img style={{ width: '16px' }} src={img_tick} alt="" /> <p>Free Cancellation till {moment(rate.cancellationPolicy.penaltyRules[0].window.start).format('MM-DD-YYYY')}</p></li>
                  </React.Fragment> : <li> <img style={{ width: '18px' }} src={img_close} alt="" /> <p> Non Refundable </p></li>
                }
                {rate.boardBasis ? <React.Fragment>
                  <li><img style={{ width: '18px' }} src={img_hotcoffee} alt="" />&nbsp; <p>{rate.boardBasis.desc}</p> </li></React.Fragment> :
                  <li><img style={{ width: '18px' }} src={img_extrabed} alt="" /> &nbsp;<p>Room Only</p></li>}
                {rate.inclusions ? _map(rate.inclusions, (each, i) => {
                  return (
                    <li key={i}><img style={{ width: '18px' }} src={img_signal} alt="" /> &nbsp;<p>{each}</p></li>
                  )
                }) : roomDescription[5] ? <li><img style={{ width: '18px' }} src={img_hotel} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[5])}</p></li> : null}
              </ul>
            </div>
            <div className="flex-column">
              <ul>
                {roomDescription[2] ? <li><img style={{ width: '18px' }} src={img_hotel} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[2])}</p></li> : null}
                {room[0].smokingIndicator ? room[0].smokingIndicator !== 'Unknown' ?
                  <li><img style={{ width: '18px' }} src={img_noSmoke} alt="" /> &nbsp;<p>{room[0].smokingIndicator}</p></li>
                  : <li><img style={{ width: '18px' }} src={img_noSmoke} alt="" /> &nbsp;<p>Smoking/ Non Smoking</p></li> : null}
                {!rate.isPrepaid ?
                  <li><img style={{ width: '18px' }} src={img_reserve} alt="" /> &nbsp;<p>Reserve Now, Pay when you stay</p></li>
                  : roomDescription[4] ? <li><img style={{ width: '18px' }} src={img_television} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[4])}</p></li> : null}
                {!rate.discounts ?
                  <li><img style={{ width: '18px' }} src={img_discount} alt="" /> &nbsp;<p>Special Discounted Price</p></li>
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-column confirmRoomRight">
          <UserRating rating={hotel.rating} />
          <div>
            <h4>{hotel.name}</h4>
            <p>
              <img src={img_WhereIcon} />
              <a href={locationRef} target="_blank" rel="noreferrer">
                {detailedAddress}
              </a>
            </p>
            <h6>{room && room[0] && room[0].name}</h6>
            <ul className="conResRoomDet">
              <li>
                <img style={{ margin: "0 10px", width: '22px' }} src={img_extrabed} alt="" />
                <p>{room[0].bedDetails.length ? _map(room[0].bedDetails, (each, i) =>
                  <React.Fragment>
                   {each.desc} {room[0].bedDetails.length > 1 ? '/' : null}
                  </React.Fragment>) :<React.Fragment> Visit hotel's website</React.Fragment>}</p>
              </li>
            </ul>
            <span>Booking for {stayDt} Nights</span>
            <ul>
              <li className="border">
                <h5>
                  {moment(checkin)
                    .format("MMM DD")
                    .toUpperCase()}
                </h5>
                <p>{moment(checkin).format("dddd")}</p>
              </li>
              <li>
                <img src={img_DateArrow} />
              </li>
              <li className="border">
                <h5>
                  {moment(checkout)
                    .format("MMM DD")
                    .toUpperCase()}
                </h5>
                <p>{moment(checkout).format("dddd")}</p>
              </li>
            </ul>
            <ul className="checkInOut">
              <li>
                <img src={img_Time} />
                <span>
                  Check In{" "}
                  <b>
                    {checkinCheckoutPolicy.length > 0
                      ? checkinCheckoutPolicy[0].inTime + 0
                      : "12.00am"}
                  </b>
                </span>
              </li>
              <li>
                <img src={img_Time} />
                <span>
                  Check Out{" "}
                  <b>
                    {checkinCheckoutPolicy.length > 0
                      ? checkinCheckoutPolicy[0].outTime + 0
                      : "06.00pm"}
                  </b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-column confirmRoomRight">
          <span>{room && room[0] && room[0].name} (<b>{selectedRoomCount[roomDesc]}</b> &nbsp;Room Selected) </span>
          <ul className="totalAmountDis">
            <li>
              <span>{room && room[0] && room[0].name} </span >
              <span >${((fareBreakup.baseFare) / stayDt).toFixed(2)}/night </span >
            </li>
            <li>
              <span>{stayDt} Nights x {selectedRoomCount[roomDesc]} Rooms</span>{" "}
              <span>${(selectedRoomCount[roomDesc]) * (fareBreakup.baseFare).toFixed(2)}</span>
            </li>
            <li>
              <span>Taxes & Fees</span>{" "}
              <span>${((taxAmount + farebreakupAmount) * selectedRoomCount[roomDesc]).toFixed(2)}</span>
              {/* <span>${(selectedRoomCount[totalAmount]) * (taxAmount + farebreakupAmount).toFixed(2)}</span> */}
            </li>
            <li>
              <span>Total Cost</span>{" "}
              <span>${((totalAmount * selectedRoomCount[roomDesc])).toFixed(2)}</span>
            </li>
          </ul>
          <h6 className="mt-2">
            Reservation & Cancellation Policy{" "}
            <i style={{ cursor: 'pointer' }}
              className="fas fa-angle-double-down"
              onClick={togglecancellation}
            />
          </h6>
          {!isCancellation && <p>{cancellationPolicy}</p>}
          <h6 className="mt-2">
            Special Instructions{" "}
            <i style={{ cursor: 'pointer' }}
              className="fas fa-angle-double-down"
              onClick={toggleSplCancel}
            />
          </h6>
          {isSpclIns && <div>{_map(policy, (each, i) => {
            return <React.Fragment>
              <span><b>{each.type}</b></span>
              <p>{rmvHtmlFunc(each.text)} </p>
            </React.Fragment>
          })}</div>}
        </div>
      </div>
    );
  }
}

export default RoomResInfo;