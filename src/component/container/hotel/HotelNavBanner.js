import React, { Component } from 'react';
import { connect } from "react-redux";
import {  withRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import img_RightArrow from "../../../asset/images/Right Arrow - All Steps.png";
import img_LeftArrow from "../../../asset/images/Left Arrow - All Steps.png";


class HotelNavBanner extends Component {


  render() {
    const { pathname } = this.props.history.location;
    const { isLoading, isLoadingFailure } = this.props;

    return (
      <React.Fragment>
        <div className={`flex-column mapDiv ${pathname === '/hotel/search' ? 'd-block' : 'd-none'}`}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172771.04389694938!2d-122.59110161474152!3d47.420765472217596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54904f7dd2ecdd31%3A0x1fb834a2a78665ec!2sVashon%2C+WA+98070%2C+USA!5e0!3m2!1sen!2sin!4v1548763725521" style={{ width: "100%", height: '92px', border: '1px solid rgb(106, 106, 106)' }}></iframe>
        </div>
        <div className={`flex-column filterResult ${pathname === '/hotel/search' ? '' : 'otherSteps'}`}>

          <div className="sectionCard">
            <ul className="navigation">
              <li ><img src={img_LeftArrow} alt="" onClick={() => this.props.history.goBack()} /></li>
              <li className={`line ${pathname === '/hotel/search' ? 'active' : ''}`}>
                <span>Select Hotel</span><a>1</a>
              </li>
              <li className={`line ${pathname === '/hotel/rooms' ? 'active' : ''}`}>
                <span>Select Room</span><a>2</a>
              </li>
              <li className={pathname === '/hotel/reservation' ? 'active' : ''}>
                <span>Confirm Room</span><a>3</a>
              </li>
              <li><img src={img_RightArrow} alt="" onClick={() => this.props.history.goForward()} /></li>

            </ul>

            {isLoading && <div className="greenLine"></div>}
            {isLoadingFailure && <div className="redLine"></div>}
            {/* <ToastContainer autoClose={4000} transition={Flip} /> */}

          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loaderReducer.isLoading,
  isLoadingFailure: state.loaderReducer.isLoadingFailure,

});

export default connect(
  mapStateToProps,
  ""
)(withRouter(HotelNavBanner))

