import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import moment from "moment";

import {
  map as _map,
  find as _find,

} from 'lodash';

import ImageCarousel from '../presentational/ImageCarousel';
import UserRating from './UserRating';

import img_whereIcon from "../../asset/images/Where Icon (Map Marker).svg";

class HotelCard extends Component {
  state = {
    isExpand: false
  }

  render() {
    const { hotel, checkin, checkout } = this.props;

    const { isExpand } = this.state;
    const locationRef = `https://maps.google.com/?q=${hotel.geocode.lat},${hotel.geocode.long}`
    const detailedAddress = hotel.contact.address.line1 + ", " + hotel.contact.address.line2 + ", " + hotel.contact.address.city.name + ", " + hotel.contact.address.countryCode + ", " + hotel.contact.address.postalCode;
    var noOfNights = moment(checkout).diff(moment(checkin), 'days');

    var actualFare =  (hotel.fare.baseFare / noOfNights).toFixed(2);
    const descriptionsData = _find(hotel.descriptions, ['type', 'General']);
    let description = descriptionsData
      ? descriptionsData['value']
      : "Description not available";

    return(
    <div className="sectionCard">
      <div className="d-flex flex-row smallColumn">
        {hotel.images.length
          ? <ImageCarousel
            hotelName={hotel.name}
            imageList={_map(hotel.images, (each, i) => ({
              name: 'img' + { i },
              url: each.URL
            }))} />
          : <ImageCarousel />}


        <div className="detailsBg flex-column">
          <UserRating rating={hotel.rating} />
          <h4>{hotel.name}</h4>
          <p>
            <img src={img_whereIcon} alt="" />
            <a href={locationRef} title={detailedAddress} target='_blank' rel="noreferrer">
              {detailedAddress.substring(0, 30) + '...'}
            </a>
          </p>
          <p>
            <span>{isExpand
              ? description
              : description.substring(0, 125)}
              <span style={{ color: 'cornflowerblue' }} onClick={() => this.setState({ isExpand: !isExpand })}>
                {description != "Description not available" ? isExpand
                  ? ' ...show less'
                  : ' ...show more' : null}
              </span>
            </span>
          </p>
        </div>
        <div className="rateShowDiv flex-column">
          <div className="priceDiv">
            {/* <strike>${hotel.fare.baseFare}</strike> */}
            <h2>${actualFare}</h2>
            <p>per night</p>
          </div>
          <button type="button" onClick={() => this.props.onSelectHotel(hotel.id)} className="selectRoomBtn">
            Select Room
            </button>
        </div>
      </div>
            </div>);
  }
}

export default withRouter(HotelCard);