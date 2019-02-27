import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../asset/scss/style.scss'
import Home from './Home';
import MainPage from './MainPage';
import Dashboard from './dashboard';
import AboutUs from '../component/AboutUs';
import Landing from './Landing';
import AuthRoute from '../component/Auth';
import cancelBooking from '../component/container/mainPage/CancelBooking';
import CancelledBooking from  '../component/container/mainPage/CancelledBooking';
import BookingConfirmation from '../component/container/mainPage/BookingConfirmation';

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return <Switch>

      <AuthRoute path="/dashboard" component={Dashboard} />
      <Redirect exact path="/" to="/hotel" />
     
      {/* <Route path={"/xeniApp"} component={Landing} /> */}
      <Route path={"/hotel"} {...this.props} component={MainPage} />
      <Route path={"/aboutUs"} component={AboutUs}/>
      <Route path={"/flight"} component={MainPage} />
      <Route path={"/car"} component={MainPage} />
      <Route path={"/package"} component={MainPage} />
      <Route path={"/activity"} component={MainPage} />
      <Route path={"/xeniApp"} component={Landing} />
      <AuthRoute path={"/cancelBooking"} component={cancelBooking} />
      <AuthRoute path={"/CancelledBooking"} component={CancelledBooking} />
      <Route path={"/bookingconfirmation"} component={BookingConfirmation} />
      <Route component={ER_PAGE} />
      {/* <Route path="/home" exact component={Home}/> */}
    </Switch>;
  }
}

const ER_PAGE = () => <div> 404 </div>