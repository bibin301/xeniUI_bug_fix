import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import {
  map as _map,
  filter as _filter,
  includes as _includes
} from 'lodash';

import {
  DragSource,
  ConnectDragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';

import { RawHtmlToJSON } from './RawHtmlToJSON';
import ImageCarousel from '../presentational/ImageCarousel';

import img_signal from "../../asset/images/selectRoom/signal.png";
import img_icon from "../../asset/images/selectRoom/icon.png";
import img_parking from "../../asset/images/selectRoom/parking-sign(1).png";
import img_minibus from "../../asset/images/selectRoom/minibus.png";
import img_hotcoffee from "../../asset/images/selectRoom/hot-coffee.png";
import img_extrabed from "../../asset/images/selectRoom/extrabed.png";
import img_drag from "../../asset/images/selectRoom/drag.png";
import img_close from '../../asset/images/cancel.png';
import img_tick from '../../asset/images/roundTick.png';
import img_info from "../../asset/images/information.png";
import img_discount from '../../asset/images/discount.png';
import img_noSmoke from '../../asset/images/no-smoking-sign (1).png';
import img_reserve from "../../asset/images/online-booking.png";
import img_hotel from "../../asset/images/hotel-building.png";
import img_television from "../../asset/images/television.png";

// Todo: have to change icons accordingly
const _amenitiesIcon = {
  Layout: img_parking, // todo
  Internet: img_icon,
  Entertainment: img_icon,
  "Food and Drink": img_hotcoffee,
  "Sleep": img_extrabed,
  "Bathroom": img_extrabed,
  "Practical": img_minibus,
  "Comfort": img_extrabed
}

class RoomCard extends Component {
  state = {
    isExpand: false
  }

  render() {
    const { room, rate, onReserve, connectDragSource, checkin, checkout, rmvHtmlFunc, handleChange, recommendations } = this.props;

    const { isExpand } = this.state;
    const _amentLength = 5;
    const roomInfo = RawHtmlToJSON(room.desc);

    var noOfNights = moment(checkout).diff(moment(checkin), 'days');
    const actualFare = (rate.baseFare / noOfNights).toFixed(2);
    // console.log('data from room card', noOfNights, actualFare, checkin, checkout)
    const amenitiesList = isExpand
      ? roomInfo.amenities
      : _filter(roomInfo.amenities, (each, i) => i < _amentLength);
    const _danSTR = room.desc.split('<strong>')[0] === '<p>'
      ? room.desc
      : '<p>' + room.desc + '</p>'
    const { hotel } = this.props;
    const roomDescription = room.desc.split('<p>');
    const roomLen = { length: room.availableRoomCount >= 4  ? 4 : room.availableRoomCount };

    return connectDragSource(
    <div className="sectionCard">
      <div className="d-flex flex-row resWrap">
        <div className="flex-column imagesection">
          {hotel.images.length ?
            <ImageCarousel
              hotelName={hotel.name}
              imageList={_map(
                hotel.images,
                each => ({ name: each.imageCaption, url: each.URL }))} /> : <ImageCarousel />}

        </div>
        <div className="flex-column hotelInfoDet detailsBg">
          {/* <h6>{hotel.name}</h6> // remove as per vaibhav instruction */}
          <p>{room.name}</p>
          {/* TODO: Mulitiple image cant be return */}
          <ul>
            <li>
              <img style={{ margin: "0 0px 0 10px", width: '22px' }} src={img_extrabed} alt="" />
              <p>{room.bedDetails.length ? _map(room.bedDetails, (each, i) =>
                <React.Fragment>
                  {each.desc} {room.bedDetails.length > 1 ? '/' : null}
                </React.Fragment>) : <React.Fragment>Visit hotel's website</React.Fragment>}</p>
            </li>
          </ul>
          {room.desc ? <span style={{ marginLeft: '10px', color: '#006DF0' }}><img src={img_info} style={{ width: '16px' }} alt="" /> More Details <div className="moreDetailToolTip" dangerouslySetInnerHTML={{ __html: _danSTR }}></div></span> : null}
          {/* TODO: For more details btn remove html tags by vaibhav intruction */}
        </div>
        <div className="detailsBg flex-column">
          <ul>
            {rate.refundability == 'Refundable' ?
              <React.Fragment>
                <li><img style={{ width: '16px' }} src={img_tick} alt="" /> <p>Free Cancellation till {moment(rate.cancellationPolicy.penaltyRules[0].window.start).format('MM-DD-YYYY')}</p></li>
              </React.Fragment> : <li> <img style={{ width: '18px' }} src={img_close} alt="" /> <p> Non Refundable </p></li>
            }
            {rate.boardBasis ? <React.Fragment>
              <li><img style={{ width: '18px' }} src={img_hotcoffee} alt="" />&nbsp; <p><b style={{ fontWeight: '500' }}>{rate.boardBasis.desc}</b></p> </li></React.Fragment> :
              <li><img style={{ width: '18px' }} src={img_extrabed} alt="" /> &nbsp;<p>Room Only</p></li>}
            {rate.inclusions ? _map(rate.inclusions, (each, i) => {
              return (
                <li key={i}><img style={{ width: '18px' }} src={img_signal} alt="" /> &nbsp;<p>{each}</p></li>
              )
            }) : roomDescription[3] ? <li><img style={{ width: '18px' }} src={img_hotel} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[3])}</p></li> : null}
            {roomDescription[2] ? <li><img style={{ width: '18px' }} src={img_hotel} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[2])}</p></li> : null}
            {room.smokingIndicator ? room.smokingIndicator !== 'Unknown' ?
              <li><img style={{ width: '18px' }} src={img_noSmoke} alt="" /> &nbsp;<p>{room.smokingIndicator}</p></li>
              : <li><img style={{ width: '18px' }} src={img_noSmoke} alt="" /> &nbsp;<p>Smoking/ Non Smoking</p></li> : null}
            {!rate.isPrepaid ?
              <li><img style={{ width: '18px' }} src={img_reserve} alt="" /> &nbsp;<p>Reserve Now, Pay when you stay</p></li>
              : roomDescription[4] ? <li><img style={{ width: '18px' }} src={img_television} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[4])}</p></li> : null}
            {!rate.discounts ?
              <li><img style={{ width: '18px' }} src={img_discount} alt="" /> &nbsp;<p>Special Discounted Price</p></li>
              : roomDescription[5] ? <li><img style={{ width: '18px' }} src={img_hotel} alt="" /> &nbsp;<p>{rmvHtmlFunc(roomDescription[5])}</p></li> : null}
          </ul>
          {/* <div dangerouslySetInnerHTML={{ __html: _danSTR }} /> */}
          {/* <ul>
            {_map(amenitiesList, (each, i) => <li key={i}>
              <img style={{ margin: "0 10px" }} src={_amenitiesIcon[each.desc]} alt="" />
              <p>{each.name}</p>
            </li>)}
            {roomInfo.amenities.length > _amentLength && <span
              onClick={() => this.setState({ isExpand: !isExpand })}
            >
              {!isExpand ? "... show more" : "... show less"}
            </span>}
          </ul> */}
        </div>
        <div className="rateShowDiv flex-column">
          <div className="priceDiv">
            <p>
              {room.availableRoomCount >=4
                ? 4 + " rooms left" : room.availableRoomCount + " rooms left"
              }
            </p>
            {/* <h2>${(totalAmt).toFixed(2)}</h2> */}
            {/* <h2>${(rate.baseFare * noOfNights).toFixed(2)}</h2> */}
            <h2>${actualFare}</h2>
          </div>
          <div className="">
            <select className="multiRoomSel" onChange={(e) => handleChange(e, recommendations)}>
              <option value='0'>Select Room</option>
              {_map(roomLen, (each, i) => {
                return (
                  <option key={i} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
          </div>
          <img src={img_drag} />
          <span className="dragDropText">Drag and Drop</span>
        </div>
      </div>
    </div>);
  }
}

const __itemSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return !_includes(_map(props.itineraryList, 'refId'),
      props.refId);
  },
  beginDrag(props) {
    const { room, refId, rate, hotel, checkout, checkin } = props;
    // console.log('begin Drag', props)
      var noOfNights = moment(checkout).diff(moment(checkin), "days");
    return {
      type: "hotel",
      refId: refId,
      hotelName: hotel.name,
      title: room.name,
      price: (rate.baseFare / noOfNights).toFixed(2)
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // console.log('end Drag',item, dropResult, component)

  }
}

const __collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const mapStateToProps = state => ({
  itineraryList: state.addcartReducer.itineraryList,

})

export default connect(mapStateToProps)(DragSource('ROOM', __itemSource, __collect)(RoomCard))