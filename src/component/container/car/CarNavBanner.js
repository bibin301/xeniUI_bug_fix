import React, { Component } from 'react';
import { connect } from "react-redux";
import {  withRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import img_RightArrow from "../../../asset/images/Right Arrow - All Steps.png";
import img_LeftArrow from "../../../asset/images/Left Arrow - All Steps.png";


class CarNavBanner extends Component {


  render() {
    const { pathname } = this.props.history.location;
    const { isLoading, isLoadingFailure } = this.props;

    return (
      <React.Fragment>
        
        <div className="flex-column filterResult  otherSteps">

          <div className="sectionCard">
            <ul className="navigation">
              <li ><img src={img_LeftArrow} alt="" onClick={() => this.props.history.goBack()} /></li>
              <li className={`line ${pathname === '/car/search' ? 'active' : ''}`}>
                <span>Select Car</span><a>1</a>
              </li>
              {/* <li className={`line ${pathname === '/hotel/rooms' ? 'active' : ''}`}>
                <span>Select Room</span><a>2</a>
              </li>
              <li className={pathname === '/hotel/reservation' ? 'active' : ''}>
                <span>Confirm Room</span><a>3</a>
              </li> */}
              <li className={`line ${pathname === '/car/extra' ? 'active' : ''}`}>
                <span>Select Extras</span><a>2</a>
              </li>
              <li className={pathname === '/car/confirm' ? 'active' : ''}>
                <span>Review & Confirm</span><a>3</a>
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
)(withRouter(CarNavBanner))

