import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { map as _map, flatMapDeep as _flatMapDeep } from "lodash";

import {
  getRoomPrice
} from "../../../service/hotel/action";

import RoomReservation from "../../presentational/RoomReservation";


class RoomResContent extends Component {
  state = {
    isCancellation: false,
    searchDate: '',
    isSpclIns: false
  }

  componentDidMount() {
    // here we should check hotel ID before rendering
    if (!this.props.sessionId || !this.props.isReserve) {
      this.getResInfo(this.props.location)
    }
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.location !== newProps.location) {
  //     this.getResInfo(newProps.location)
  //   }
  // }

  payloadGenerate = (sessionId, hotelId, currency, recomId, roomCount) => {
    return (
      _map(roomCount, (item, i) => {
        return (
          typeof (recomId) == 'object' ?
            _map(Array.apply(null, { length: item }), (each, index) => {
              return {
                sessionId,
                hotelId,
                'recommendationId': recomId[i],
                "optionalDataPrefs": [
                  "All"
                ],
                currency
              }
            })
            :
            _map(Array.apply(null, { length: item }), (each, index) => {
              return {
                sessionId,
                hotelId,
                'recommendationId': recomId,
                "optionalDataPrefs": [
                  "All"
                ],
                currency
              }
            })
        )
      })
    )
  }

  getResInfo = location => {
    const values = queryString.parse(location.search)
    this.setState({ searchDate: values })
    const { sessionId, currency, hotelId, recomId, roomCount } = values;
    this.props.getRoomPrice(_flatMapDeep(this.payloadGenerate(sessionId, hotelId, currency, recomId, roomCount)));
  }

  togglecancellation = () => {
    this.setState({ isCancellation: !this.state.isCancellation });
  }

  toggleSplCancel = () => {
    this.setState({ isSpclIns: !this.state.isSpclIns });
  }

  rmvHtmlFunc = (str) => {
    console.log('str remv html', str)
    if ((str === null) || (str === ''))
      return 'No Description Available';
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  render() {
    const { hotel, searchDate, fareBreakup, rooms,
      rates, isSearching, pricedRooms, roomPriceInfo } = this.props;
    const { isCancellation, isSpclIns } = this.state;
    const values = queryString.parse(window.location.search)
    const checkin = values.checkin;
    const checkout = values.checkout;
    return (
      <div>
        {!isSearching && roomPriceInfo && <RoomReservation
          bookingDate={this.state.searchDate}
          checkin={checkin}
          checkout={checkout}
          togglecancellation={this.togglecancellation}
          toggleSplCancel={this.toggleSplCancel}
          isCancellation={isCancellation}
          rmvHtmlFunc={this.rmvHtmlFunc}
          isSpclIns={isSpclIns}
          roomPriceInfo={roomPriceInfo} />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching,
  hotel: state.hotelReducer.hotel,
  isReserve: state.hotelReducer.isReserve,
  sessionId: state.hotelReducer.sessionId,
  searchDate: state.hotelReducer.searchDate,
  pricedTotalFare: state.hotelReducer.pricedTotalFare,
  quotedTotalFare: state.hotelReducer.quotedTotalFare,
  fareBreakup: state.hotelReducer.fareBreakup,
  pricedRooms: state.hotelReducer.pricedRooms,
  rates: state.hotelReducer.rates,
  requestedOccupancies: state.hotelReducer.requestedOccupancies,
  roomOccupancies: state.hotelReducer.roomOccupancies,
  rooms: state.hotelReducer.rooms,
  roomPriceInfo: state.hotelReducer.roomPriceInfo
});

const mapDispatchToProps = dispatch => ({
  getRoomPrice: (payload) =>
    dispatch(getRoomPrice(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomResContent));
