import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

import RoomContent from './RoomContent';
import RoomResContent from './RoomResContent';
import HotelNavBanner from "./HotelNavBanner";
import SearchResult from './SearchResult';
import Footer from './../../Footer'

class HotelContent extends Component {
     constructor(props)
     {
       super(props)
     }
     
  render() {
    return (
      <React.Fragment>
      <div className="d-flex flex-row tab-column justify-content-start">
        <HotelNavBanner {...this.props} />
      </div>
             
        {<Switch>
          <Route key='hotel' exact path="/hotel/search" component={SearchResult} />
          <Route key='room' exact path="/hotel/rooms" component={RoomContent} />+
          <Route key='reservation' exact path="/hotel/reservation" component={RoomResContent} />
        </Switch>}
           
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching
});

export default withRouter(connect(
  mapStateToProps,
  null
)(HotelContent));
