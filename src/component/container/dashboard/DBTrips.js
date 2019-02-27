import React, { Component } from 'react';
import { connect } from "react-redux";
import { filter as _filter } from 'lodash';
import propTypes from 'prop-types'

import { tripDeatiledList } from "../../../service/dashboard/action";
import img_tabelarrow from '../../../asset/images/dashboard/tabelarrow.png'

import TripCard from './trips/TripCard';
// import CancellationModal from './CancellationModal'


class DBTrips extends Component {

  // componentWillMount(){
  //   const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
  //   if(loginInfo){
  //     this.props.history.push("/dashboard/my-trips")

  //   }
  // }
  
  componentDidMount() {
    const { email } = this.props.loginDetails;
    const data = {
      email
    }
    this.props.tripDeatiledList(data);
  }

  state ={
    isCancelled:false,
    cancellationPolicyInfo:[]
  }

 
  bookingCancel = (data) =>{

    this.setState({cancellationPolicyInfo:data})
    this.setState({isCancelled:true})
   }

   rmvHtmlFunc = (str) => {
    if ((str === null) || (str === ''))
      return 'No Description Available';
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }
  close =() =>{

    this.setState({isCancelled:false})
  }
 
    render() {
    const {isCancelled ,cancellationPolicyInfo} = this.state;
    const { myTripList, hotel, fareBreakup, rooms, rates, searchDate } = this.props;
 
    //const renderCancelModal = isCancelled && <CancellationModal onHide={this.close} cancellationPolicyInfo={cancellationPolicyInfo}/>

    return (
      
      <div className="dashRightSide align-self-start" >

      {/* {renderCancelModal} */}
      
        <div className="mytripTable">
          <table >
            <thead>
              <tr>
                <th>Sl</th>
                <th>Title</th>
                <th>Location</th>
                <th>Date Booked <img src={img_tabelarrow} /> </th>
                <th>Travel Date <img src={img_tabelarrow} /> </th>
                <th>Price <img src={img_tabelarrow} /> </th>
              
              </tr>
            </thead>
            <tbody id="accordion">
              {myTripList && myTripList.length ?
                _filter(myTripList, { 'booking_type': 'Hotel' }).map((item, i) =>
                  <TripCard rmvHtmlFunc={this.rmvHtmlFunc} onCancel={this.bookingCancel} key={i} index={i} type={'hotel'}
                    TransList={item} />) : <p>No Trips Found</p>}
              {/* TODO : Need to integrated once car and flight booking completed */}
              {/* <TripCard index='1' type={'car'}
                TransList={_filter(myTripList, { 'booking_type': 'Car' })} />
              <TripCard index='2' type={'flight'}
                TransList={_filter(myTripList, { 'booking_type': 'Flight' })} /> */}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  myTripList: state.dashboardReducer.myTripList,
  hotel: state.hotelReducer.hotel,
  searchDate: state.hotelReducer.searchDate,
  pricedTotalFare: state.hotelReducer.pricedTotalFare,
  fareBreakup: state.hotelReducer.fareBreakup,
  rates: state.hotelReducer.rates,
  rooms: state.hotelReducer.rooms,
  loginDetails: state.loginReducer.loginDetails
});

const mapDispatchToProps = dispatch => ({
  tripDeatiledList: (data) => dispatch(tripDeatiledList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DBTrips);


DBTrips.propTypes  ={
  onCancel:propTypes.func,
  
}


//Reference


{/* <tbody id="accordion">
{myTripList && myTripList.length ?
  _filter(myTripList, { 'booking_type': 'Hotel' }).map((item, i) =>
    <TripCard key={i} index={i} type={'hotel'}
      TransList={item} />) : <p>No Trips Found</p>}
 TODO : Need to integrated once car and flight booking completed 
 <TripCard index='1' type={'car'}
  TransList={_filter(myTripList, { 'booking_type': 'Car' })} />
<TripCard index='2' type={'flight'}
  TransList={_filter(myTripList, { 'booking_type': 'Flight' })} /> 
</tbody> */}