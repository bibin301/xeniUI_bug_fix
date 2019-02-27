import React, { Component } from "react";
import img_Xeniapp from "../../asset/images/Xeniapp Customers.svg";
import img_clock from "../../asset/images/clock.svg";
import img_customer from "../../asset/images/Xeniapp Customers.svg";
import { relativeTimeThreshold } from "moment";

class HotelBookingProtection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHotelBookingShow: false,
      showReasons: true
    };
  }
  handleCheck = e => {
    this.setState({ isHotelBookingShow: e.target.checked });
  };
  handleChange = () => {
    this.setState({ showReasons: !this.state.showReasons });
  };
  render() {
    const { isHotelBookingShow, showReasons } = this.state;
    const { tripAmount } = this.props;
    return (
      <React.Fragment>
        <div className="headerTitles">
          <h5>Hotel Booking Protection</h5>
          <div className="">
            <span>Yes</span>
            <input type="checkbox" id="switch" checked={isHotelBookingShow} onChange={this.handleCheck} />
            <label htmlFor="switch">Toggle</label>
            <span>No</span>
          </div>
        </div>
        {isHotelBookingShow && (
          <div className="hotelProtectInfo">
            <small>
              <img src={img_clock} alt="" /> Avoid unnecessary fees. Protect
              your trip.
            </small>
            <p>
              5 reasons you might need Travel Protection{" "}
              <i
                className="fas fa-angle-double-down"
                onClick={this.handleChange}
              />
            </p>
            {showReasons && (
              <ol>
                <li>You want to avoid a late cancellation or no-show fee</li>
                <li>You get delayed and miss a night of your hotel stay</li>
                <li> Your trip is delayed and you need a hotel or meal</li>
                <li> You get sick and don't use all your hotel nights</li>
                <li> Your bag is delayed and you need to buy essentials</li>
              </ol>
            )}
            <span>
              Select Yes or No to continue booking <b>*</b>
            </span>
            <ul>
              <li>
                <div className="">
                  <input type="radio" id="test1" name="radio-group" checked={isHotelBookingShow} onChange={this.handleCheck}/>
                  <label htmlFor="test1" />
                  <div className="">
                    <p>
                      <b>Yes</b>, I want Hotel Booking Protection for my trip to
                      New York.
                    </p>
                    <small>
                      <img src={img_customer} alt="" /> 67,084 Xeniapp customers
                      protected their trip in the last 7 days
                    </small>
                  </div>
                  <span>$9.00</span>
                </div>
              </li>
              <li>
                <div className="">
                  <input type="radio" id="test2" name="radio-group" />
                  <label htmlFor="test2" />
                  <div className="">
                    <p>
                      <b>No</b>, I'm willing to risk my ${tripAmount} Trip. I
                      understand by declining this coverage that I may be
                      responsible for cancellation fees and delay expenses
                      either personally or through alternate cover..
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default HotelBookingProtection;
