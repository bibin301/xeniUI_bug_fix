import React, { Component } from "react";
import moment from 'moment';
import { connect } from "react-redux";
import queryString from "query-string";

import img_DateArrow from "../../../asset/images/Date Arrow.png";
// import { searchHotel } from "../../../service/hotel/action";
class CarSearchBanner extends Component {
  
  state={
     checkin:"",
     checkout:""
  }
 
 
  render() {
   // const { hotelCount, searchDate: { start, end }, resultCount } = this.props;
   
    return (
      <div>
     <div className="sectionCard searchRes">
            <div className="text-center searchInfo">
              <h3> 125 Car available from</h3>
              <ul>
                <li className="border">
                  <h5>19-02-2019</h5>
                  <p>Friday</p>
                </li>
                <li>
                  <img src={img_DateArrow} alt="" />
                </li>
                <li className="border">
                  <h5>20-02-2019</h5>
                  <p>Saturday</p>
                </li>
              </ul>
            </div>
           
          </div>

        {/* {!!resultCount && (
          <div className="sectionCard searchRes">
            <div className="text-center searchInfo">
              <h3> {resultCount} hotels available from</h3>
              <ul>
                <li className="border">
                  <h5>{moment(start ? start : this.state.checkin).format('MMM DD').toUpperCase()}</h5>
                  <p>{moment(start ? start : this.state.checkin).format('dddd')}</p>
                </li>
                <li>
                  <img src={img_DateArrow} alt="" />
                </li>
                <li className="border">
                  <h5>{moment(end ? end : this.state.checkout).format('MMM DD').toUpperCase()}</h5>
                  <p>{moment(end ? end : this.state.checkout).format('dddd')}</p>
                </li>
              </ul>
            </div>
           
          </div>
        )} */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   hotelCount: state.hotelReducer.hotelCount,
//   resultCount: state.hotelReducer.hotelList.length,
//   searchDate: state.hotelReducer.searchDate,
// });
// const mapDispatchToProps = dispatch => ({
//   searchHotel: searchInfo => dispatch(searchHotel(searchInfo)),
  
// })
export default CarSearchBanner;
