import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

// import RoomContent from './RoomContent';
// import RoomResContent from './RoomResContent';
import CarNavBanner from "./CarNavBanner";
import CarSearchResult from './CarSearchResult';
import CarExtraContent from './CarExtraContent';
import CarConfirmContent from './CarConfirmContent';
class CarContent extends Component {
     constructor(props)
     {
       super(props)
     }
     
  render() {
      console.log(this.props ,"poropdsaasa");
    return (
      <React.Fragment>
      <div className="d-flex flex-row tab-column justify-content-start">
        <CarNavBanner {...this.props} />
        
      </div>
             
        {<Switch>
          <Route key='car' exact path="/car/search" component={CarSearchResult} />
           <Route key='extra'  path="/car/extra" component={CarExtraContent} />
        <Route key='confirm' exact path="/car/confirm" component={CarConfirmContent} /> 
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
)(CarContent));
