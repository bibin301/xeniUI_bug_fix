import React, { Component } from "react";
import queryString from "query-string";
import "react-daterange-picker/dist/css/react-calendar.css";
import { connect } from "react-redux";
import { extendMoment } from "moment-range";

import {
  map as _map,
  find as _find,
  indexOf as _indexOf,
  filter as _filter
} from 'lodash';

import {
  searchRoom,
  getRoomPrice,
  searchRoomStateless
} from "../../../service/hotel/action";

import HotelInfo from "../../presentational/hotelInfo";

import img_calendar from "../../../asset/images/Calendar.svg";
import RoomCard from "../../presentational/RoomCard";
import AlertHotelCard from "../../presentational/AlertHotelCard";
import originalMoment from "moment";
import openNewTab from "../../../asset/images/dashboard/resize.png";
import ImageCarousel from '../../presentational/ImageCarousel';
import UserRating from '../../presentational/UserRating'
import searchIcon from "../../../asset/images/Search Icon.png";
import noImage from '../../../asset/images/test_image.jpg';
import img_whereIcon from "../../../asset/images/Where Icon (Map Marker).svg";


const moment = extendMoment(originalMoment);
const today = moment();
const values = queryString.parse(window.location.search);
const { checkin, checkout, adult, child } = values;

class RoomContent extends Component {

  state = {
    adult: adult,
    room: "",
    child: child,
    startDate: checkin,
    endDate: checkout,
    value: moment.range(moment(checkin).clone(), moment(checkout).clone()),
    isCalendar: false,
    isDesc: false, isAmenities: false, isContact: false, isPolicy: false, isMain: true, isNear: false,
    multiRoomsValues: []
  };

  componentDidMount() {
    console.log("roomList", this.props.roomList);
    if (!this.props.sessionId) {
      this.getRoomList(this.props.location);
    }
    if( this.props.roomList.length===0)
    {
      this.getRoomList(this.props.location);
    }
  }

  componentWillReceiveProps(newProps) {

    const values = queryString.parse(window.location.search);
    const { checkin, checkout, adult, child, childAgeValues, searchText } = values;
    this.setState({ startDate: checkin });
    this.setState({ endDate: checkout })
    // if (this.props.location !== newProps.location) {
    //   if (this.props.location !== newProps.location) {
    //     this.getRoomList(newProps.location);
    //   }
    // }
  }

  getRoomList = location => {
    const { hotelId, sessionId, currency } = queryString.parse(location.search);
    this.props.searchRoom(sessionId, hotelId, currency);
  };

  handleStartDate = e => {
    this.setState({
      isCalendar: true
      // startDate: e.target.value
    });
  };

  handleEndDate = e => {
    this.setState({
      isCalendar: true
      // endDate: e.target.value
    });
  };

  handleOnReserve = () => {
    const values = queryString.parse(window.location.search);
    const { checkin, checkout, adult, child, childAgeValues, searchText } = values;
    const { sessionId, hotel, getRoomPrice, currency } = this.props;
    const searchString = {
      sessionId,
      currency,
      hotelId: hotel.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      checkin, checkout, adult, child, childAgeValues, searchText,
      recomId: _map(this.state.multiRoomsValues, 'recommendationId'),
      roomCount: _map(this.state.multiRoomsValues, 'roomCount')
    }

    this.props.history.push("/hotel/reservation?" + queryString.stringify(searchString));
  };

  handleGuest = event => {
    this.setState({ adult: event.target.value });
  };

  handleRoom = event => {
    this.setState({ room: event.target.value });
  };

  handleChild = event => {
    this.setState({ child: event.target.value });
  };

  onSelect = (value, states) => {
    this.setState({
      value,
      startDate: moment(value.start._d).format("YYYY-MM-DD"),
      isCalendar: false,
      endDate: moment(value.end._d).format("YYYY-MM-DD")
    });
  };

  toggleShowCal = () => {
    this.setState({ isCalendar: true });
  }

  rmvHtmlFunc = (str) => {
    if ((str === null) || (str === ''))
      return 'No Description Available';
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  handle = () => {
    const { hotel, searchRoomStateless, currency, selectedCountryCode } = this.props;
    const { startDate, endDate, adult, room, child } = this.state;
    const payload = {
      stayPeriod: {
        start: startDate,
        end: endDate
      },
      hotelId: hotel.id,
      adult: {
        type: "adult",
        count: adult
      },
      child: {
        type: "child",
        count: child
      },
      currency: selectedCountryCode
    };
    searchRoomStateless(payload);
  };

  handleChange = (e, recommendations) => {
    const value = e.target.value;
    const id = _indexOf(this.state.multiRoomsValues, _find(this.state.multiRoomsValues, ['recommendationId', recommendations.id]))
    if (id != -1) {
      let multiRoomsValues = [...this.state.multiRoomsValues];
      multiRoomsValues[id] = { 'roomCount': value, 'recommendationId': recommendations.id };
      this.setState({ multiRoomsValues });
    } else {
      let multiRoomsValues = [...this.state.multiRoomsValues];
      multiRoomsValues.push({ 'roomCount': value, 'recommendationId': recommendations.id });
      this.setState({ multiRoomsValues });
    }
  }

  render() {
    const {
      hotel,
      roomList,
      roomRates,
      isSearching,
      roomRecommendations,
      searchDate: { start, end }
    } = this.props;
    const { startDate, endDate, isPolicy,
      isMain, isAmenities, isContact, isDesc, isNear, multiRoomsValues } = this.state;
    const values = queryString.parse(window.location.search)
    const checkin = values.checkin;
    const checkout = values.checkout;
    const fliteravailableRoomCount = roomList && _filter(roomList, (each, index) => {
      return (each.availableRoomCount > 0)
    })
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap justify-content-between">
          <div className={`flex-column tabInfoRoom ${isMain ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isMain: true, isDesc: false, isAmenities: false, isContact: false, isPolicy: false, isNear: false })}>Photos</div>
          <div className={`flex-column tabInfoRoom ${isDesc ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isDesc: true, isAmenities: false, isContact: false, isPolicy: false, isMain: false, isNear: false })}>Description</div>
          <div className={`flex-column tabInfoRoom ${isAmenities ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isDesc: false, isAmenities: true, isContact: false, isPolicy: false, isMain: false, isNear: false })}>Amenities</div>
          <div className={`flex-column tabInfoRoom ${isNear ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isDesc: false, isAmenities: false, isContact: false, isPolicy: false, isMain: false, isNear: true })}>Near Us</div>
          <div className={`flex-column tabInfoRoom ${isPolicy ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isDesc: false, isAmenities: false, isContact: false, isPolicy: true, isMain: false, isNear: false })}>Policies</div>
          <div className={`flex-column tabInfoRoom ${isContact ? 'activeTab' : ''}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ isDesc: false, isAmenities: false, isContact: true, isPolicy: false, isMain: false, isNear: false })}>Hotel Contact</div>
        </div>
        {hotel && <HotelInfo hotel={hotel} isPolicy={isPolicy} rmvHtmlFunc={this.rmvHtmlFunc}
          isMain={isMain} isAmenities={isAmenities} isContact={isContact} isDesc={isDesc} isNear={isNear} />}
        
        {/*end tab section  */}
        <div className="selectRoomBg d-flex flex-wrap">
          {!isSearching && <React.Fragment>
            <div className="selectRoomTitle">
              <h4>Select your room</h4>
              {/* <button className="selectNewTab" onClick={() => window.open(window.location, '_blank')} ><img src={openNewTab} /> </button> */}
            </div>
            <div className="selectRoomItemsBg">
              <div className="d-inline-flex flex-row smallTabColumn mb-2">
                <div className="seleboxs1 flex-column">
                  <img src={img_calendar} className="calendImg" />
                  <input
                    type="text"
                    className="borderRight"
                    placeholder="Sat,Oct 20"
                    onChange={this.handleStartDate}
                    value={startDate}
                    onFocus={this.toggleShowCal}
                  />
                  <input
                    type="text"
                    className=""
                    placeholder="Fri,Oct 26"
                    onChange={this.handleEndDate}
                    value={endDate}
                    onFocus={this.toggleShowCal}
                  />
                  {/* {isCalendar &&
                    <DateRangePicker
                      value={this.state.value}
                      onSelect={this.onSelect}
                      numberOfCalendars={2}
                    />
                  } */}

                </div>
                <button type="button" style={{ float: 'right', cursor: 'pointer' }} onClick={this.handleOnReserve} disabled={!multiRoomsValues.length} className="selectRoomBtn reserveBtn">
                  BOOK NOW
                </button>
                <div className="selectDivsAl">
                  {/* <div className="form-group">
                <select
                  className=""
                  value={this.state.room}
                  onChange={this.handleRoom}
                >
                  <option disabled value=''>Room</option>
                  <option value="1">1 Room </option>
                  <option value="2">2 Rooms </option>
                  <option value="3">3 Rooms </option>
                  <option value="4">4 Rooms </option>
                </select>
              </div> */}
                  <div className="form-group">
                    {/* <select
                  className=""
                  value={this.state.adult}
                  onChange={this.handleGuest}
                > */}
                    {/* <option disabled value="">
                    Adult
                  </option>
                  <option value="1">1 Adult </option>
                  <option value="2">2 Adults </option>
                  <option value="3">3 Adults </option>
                  <option value="4">4 Adults </option> */}
                    {/* </select> */}
                  </div>
                  <div className="form-group">
                    {/* <select
                  className=""
                  value={this.state.child}
                  onChange={this.handleChild}
                > */}
                    {/*  <option disabled value="">
                    Child
                  </option>
                  <option value="1">1 Child </option>
                  <option value="2">2 children </option>
                  <option value="3">3 children </option>
                  <option value="4">4 children </option> */}
                    {/* </select> */}
                  </div>
                  {/* <button
                type="button"
                className="searchBtn search-room"
                onClick={this.handle}
              >
                <img src={searchIcon} title="Search Room" alt="search Room" />
              </button> */}
                </div>

              </div>

              {fliteravailableRoomCount && fliteravailableRoomCount.length ? (
                fliteravailableRoomCount.map((room, index) => (

                  <RoomCard
                    hotel={hotel}
                    key={index}
                    refId={room.refId}
                    room={room}
                    rate={roomRates[index]}
                    rateList={roomRates}
                    recommendations={roomRecommendations[index]}
                    checkin={checkin}
                    checkout={checkout}
                    rmvHtmlFunc={this.rmvHtmlFunc}
                    onReserve={() =>
                      this.handleOnReserve(roomRecommendations[index])
                    }
                    handleChange={this.handleChange}
                  />
                ))
              ) : (
                  <AlertHotelCard alertInfo="No Rooms Available" />
                )}
            </div>
          </React.Fragment>}
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching,
  currency: state.hotelReducer.currency,
  sessionId: state.hotelReducer.sessionId,
  hotel: state.hotelReducer.hotel,
  roomList: state.hotelReducer.roomList,
  roomRates: state.hotelReducer.rateList,
  searchDate: state.hotelReducer.searchDate,
  roomRecommendations: state.hotelReducer.recommendations,
  selectedCountryCode: state.commonReducer.selectedCountryCode

});

const mapDispatchToProps = dispatch => ({
  searchRoom: (sessionId, hotelId, currency) => dispatch(searchRoom(sessionId, hotelId, currency)),
  getRoomPrice: (sessionId, hotelId, recommendationsId, currency) =>
    dispatch(getRoomPrice(sessionId, hotelId, recommendationsId, currency)),
  searchRoomStateless: (startDate, endDate, hotel, adult, child, currency) =>
    dispatch(searchRoomStateless(startDate, endDate, hotel, adult, child, currency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContent);
