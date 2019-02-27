import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "react-phone-number-input/style.css";

import {
  map as _map,
  pick as _pick,
  partialRight as _partialRight,
  filter as _filter
} from "lodash";

import { getCard } from '../../service/card/action'
import { payment ,bookingReset } from "../../service/payment/action";

import InputField from "../Fields/TextField";
import SelectField from "../Fields/SelectField";
import SignInModal from "../container/login/SignInModal"

import img_paymentCard from "../../asset/images/paymentCard1.png";

class Payment extends Component {

  state = {
    isModal: false,
    card: null,
    phone: "",
    concatError: "",
    contactValid: true,
    country: "",
    region: "",
    countryFilter: "",
    isdivHide: true,
    isModalOpen: false
  };


  componentWillReceiveProps(nextProps) {
    const { bookingConfirm, paymentDetails } = nextProps;
    if (bookingConfirm === 'success') {
      this.props.history.push("/bookingconfirmation");
    }
    if(bookingConfirm === 'failure') {
      this.setState({ isModal: true })
    }
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleModal = () => {
    this.props.bookingReset();
    this.setState({ isModal: !this.state.isModal });
  };

  handleSelectCard = e => {
    this.setState({ card: e.target.value });
  };

  close = () => {
    this.setState({ isModalOpen: false })
  }


  handleBooking = value => {

    if (this.props.loginDetails === null || this.props.loginDetails.status == false) {
      this.setState({ isModalOpen: true });
      this.setState({ isModal: false })

    }
       else {
      const count = this.state.countryFilter && this.state.country && _filter(
        this.state.countryFilter,
        (each, i) => {
          return each.name === this.state.country;
        }
      );


      const { hotel, sessionId, tripAmount, periodStay, roomPriceInfo, checkin, checkout, searchDate } = this.props;

      const { email } = this.props.loginDetails && this.props.loginDetails;

      const payload = _map(roomPriceInfo, (each, i) => {
        console.log("sessionId payment", sessionId)
        return (
          {
            images: [each.hotel.images[0],each.hotel.images[1]],
            policies: each.hotel.policies,
            amenities: [each.hotel.amenities[0],each.hotel.amenities[1],each.hotel.amenities[2],
            each.hotel.amenities[3], each.hotel.amenities[4]
          ],
            rooms_info: each.rooms,
            stayPeriod: {
              start: checkin,
              end: checkout
            },
            rating: each.hotel.rating,
            geocode: each.hotel.geocode,
            sessionId: each.sessionId,
            email: email,
            hotelId: each.hotel.id,
            rooms: [
              {
                roomRefId: each.pricedRooms[0].roomRefId,
                rateRefId: each.pricedRooms[0].rateRefId,
                guests: [
                  {
                    type: "Adult",
                    name: {
                      first: value.firstName,
                      last: value.lastName
                    },
                    age: 25
                  }
                ]
              }
            ],
            totalAmount: each.fareBreakup.baseFare * periodStay + (each.fareBreakup.taxes.length > 0 ? each.fareBreakup.taxes[0].amount * periodStay : 0) + each.fareBreakup.baseFare * periodStay * 0.12,
            paymentBreakup: [ // TODO : Ask jansi to clarify hard coded
              {
                paymentMethodRefId: "1",
                amount: each.fareBreakup.totalFare,
                currency: "USD",
                type: "Cash"
              }
            ],
            paymentMethod: {
              cards: [
                {
                  num: value.cardNumber,
                  nameOnCard: value.cardName,
                  cvv: value.cvv,
                  issuedBy: "VI",
                  expiry: {
                    month: value.month,
                    year: value.year
                  },
                  contactInfo: {
                    phones: [
                      {
                        num: value.phoneNumber
                      }
                    ],
                    billingAddress: {
                      line1: value.address,
                      city: {
                        code: "SFO",
                        name: value.city
                      },
                      state: {
                        code: "CA",
                        name: value.state
                      },
                      countryCode: count && count[0].alpha2Code,
                      postalCode: value.zipcode
                    },
                    email: value.email
                  }
                }
              ]
            },
            customer: {
              name: {
                first: value.firstName,
                last: value.lastName
              },
              contactInfo: {
                phones: [
                  {
                    num: this.state.phone
                  }
                ],
                address: {
                  line1: value.address,
                  city: {
                    code: "SFO",
                    name: value.city
                  },
                  state: {
                    code: "CA",
                    name: this.state.region
                  },
                  countryCode: count && count[0].alpha2Code,
                  postalCode: value.zipcode
                },
                email: value.email
              },
              dob: "1989-12-25",  // TODO : Maintain hardcoded value for both dob and nationality as per vishal instruction
              nationality: "US",
              customerId: "43435"  // TODO : We are using mail id to retrive data so now just pass dummy value
            },
            primaryGuest: {
              name: {
                first: value.firstName,
                last: value.lastName
              },
              contactInfo: {
                phones: [
                  {
                    num: this.state.phone
                  }
                ],
                address: {
                  line1: value.address,
                  city: {
                    code: "SFO",
                    name: value.city
                  },
                  state: {
                    code: "CA",
                    name: value.state
                  },
                  countryCode: "US",
                  postalCode: value.zipcode
                },
                email: value.email
              },
              age: 25
            },
            booking_type: "Hotel",
            date_booked: moment(new Date()).format("MM/DD/YYYY"),
            travel_date: this.props.checkin,
            hotel_address: {
              name: each.hotel.name,
              contact: each.hotel.contact
            },
            cancellationPolicy: each.rates[0].cancellationPolicy,
            refundability: each.rates[0].refundability,
            fareBreakup:each.fareBreakup
          }
        )
      })

      console.log("payment payload", payload);
      this.props.payment(payload);
     // this.setState({ isModal: true });
      //this.props.history.push('/bookingconfirmation')

    }

  };
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({
        countryFilter: _map(
          response.data,
          _partialRight(_pick, ["name", "alpha2Code"])
        )
      });
    });
  }

  render() {

    // const count = this.state.countryFilter &&  this.state.country && _filter(this.state.countryFilter,(each,i)=>{
    //      return each.name === this.state.country ;
    //  });

    const {
      handleSubmit,
      paymentDetails,
    } = this.props;

    let response;
    //{paymentDetails && paymentDetails.data ? paymentDetails.data: ""}

    if (paymentDetails && paymentDetails.data === "") {
      response = ""
    } else if (paymentDetails && paymentDetails.message === "success") {
      response = paymentDetails.data;
    } else if (paymentDetails && paymentDetails.message === "failure") {
      response = paymentDetails.data.message;
    }


    console.log('paymentDetails', paymentDetails)

    const { country, region, isdivHide, isModalOpen } = this.state;
    const renderModel = isModalOpen && <SignInModal isdivHide={isdivHide} onHide={this.close} />

    return (
      <React.Fragment>
        {renderModel}
        <form
          onSubmit={handleSubmit(this.handleBooking)}
          style={{ width: "100%" }}
        >
          <div>
            <div className="headerTitles paymentRes justify-content-start">
              <h5>Pay with Credit Card / Debit Card</h5>
              <img src={img_paymentCard} className="cardImg" alt="" />
            </div>
            <div className="paymentDetails">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-9">
                  <div className="form-group">
                    <Field
                      name="cardNumber"
                      type="text"
                      label="Credit Card Number"
                      component={InputField}
                      placeholder="Enter Your Card Number "
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <Field
                      name="cvv"
                      type="text"
                      label="CVV"
                      component={InputField}
                      placeholder="CVV "
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6col-lg-6 col-md-6">
                  <div className="form-group">
                    <Field
                      name="cardName"
                      type="text"
                      label="Name on Card"
                      component={InputField}
                      placeholder="Enter Your Name of card "
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <Field
                      name="month"
                      type="text"
                      label="Expired month"
                      component={SelectField}
                      placeholder="Expired month">
                      <option>Select the Month</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Field>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <Field
                      name="year"
                      type="text"
                      label="Year"
                      component={InputField}
                      placeholder="year"
                    />
                  </div>
                </div>
              </div>
              <h5>Billing Address</h5>
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-9">
                  <div className="form-group">
                    <Field
                      name="address"
                      type="text"
                      label="Address"
                      component={InputField}
                      placeholder="Address "
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <label>Select Country</label>
                    <CountryDropdown
                      name={country}
                      value={country}
                      countryValueType="short"
                      onChange={val => this.selectCountry(val)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="form-group">
                    <Field
                      name="city"
                      type="text"
                      label="City/Town"
                      component={InputField}
                      placeholder="City/Town "
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="form-group">
                    <label>State</label>
                    <RegionDropdown
                      country={country}
                      value={region}
                      onChange={val => this.selectRegion(val)}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <Field
                      name="zipcode"
                      type="text"
                      label="Zip Code"
                      component={InputField}
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="form-group">
                    <Field
                      name="firstName"
                      type="text"
                      label="First Name"
                      component={InputField}
                      placeholder="First Name"
                    />

                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="form-group">
                    <Field
                      name="lastName"
                      type="text"
                      label="Last Name ?"
                      component={InputField}
                      placeholder="Last Name "
                    />
                  </div>
                </div>
                {/* <div className="col-xl-3 col-lg-3 col-md-3">
                  <div className="form-group">
                    <label>Same as Credit Card</label>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value=""
                    />
                    <label htmlFor="styled-checkbox-1" />
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="form-group">
                    <Field
                      name="email"
                      type="text"
                      label="Email"
                      component={InputField}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <PhoneInput
                      placeholder="Enter Mobile Number"
                      name="contact"
                      value={this.state.phone}
                      onChange={phone =>
                        this.setState({ phone }, () => {
                          if (phone) {
                            if (isValidPhoneNumber(phone)) {
                              this.setState({
                                concatError: "",
                                contactValid: true
                              });
                            } else {
                              this.setState({
                                concatError: "Please enter valid Mobile Number",
                                contactValid: false
                              });
                            }
                          }
                        })
                      }
                    />

                    {!this.state.contactValid && (
                      <span style={{ color: "red" }}>
                        {this.state.concatError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mt-3 mb-1 text-right">
                  <button type="button" className="searchBtn">
                    Add to itinerray
                  </button>
                  <button className="searchBtn completebtn">
                    Complete Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {this.state.isModal === true && (
          <div
            className="modal backgroundDark"
            id="myModal"
            style={{ display: "block" }}
          >
            <div className="modal-dialog signInPopup">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">payment</h4>
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleModal}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="socialBtnGroup" />

                  <h3>
                    {paymentDetails && paymentDetails
                      ? paymentDetails.status
                      : "Loading...."}
                  </h3>
                  <p> {response && response.message} </p>
                  {/* <p> {paymentDetails && paymentDetails.data ? paymentDetails.data: ""} </p> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const fieldValidation = formProps => {

  const errors = {};

  if (!formProps.cardNumber) {
    errors.cardNumber = "Required";
  } else if (/\D/.test(formProps.cardNumber)) {
    errors.cardNumber = "numbers only allowed";
  }
  if (!formProps.cardName) {
    errors.cardName = "Required";
  }
  if (!formProps.cvv) {
    errors.cvv = "Required";
  } else if (!/^[0-9]{3}$/.test(formProps.cvv)) {
    errors.cvv = "cvv should contain 3 digit";
  }
  if (!formProps.month) {
    errors.month = "Required";
  }
  if (formProps.year != "" && !/^[0-9]+$/.test(formProps.year)) {
    errors.year = "Please Enter Numeric Values Only";
  } else if (!/^[0-9]{4}$/i.test(formProps.year)) {
    errors.year = "year should contain 4 digit";
  }
  if (!formProps.address) {
    errors.address = "Required";
  }
  if (!formProps.city) {
    errors.city = "Required";
  }
  if (!formProps.state) {
    errors.state = "Required";
  }
  if (!formProps.country) {
    errors.country = "Required";
  }
  if (!formProps.zipcode) {
    errors.zipcode = "Required";
  } else if (/\D/.test(formProps.zipcode)) {
    errors.zipcode = "zipcode allowed only number";
  }
  if (!formProps.firstName) {
    errors.firstName = "first name is Required";
  }
  if (!formProps.lastName) {
    errors.lastName = "Last name is required"
  }
  if (!formProps.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = "Invalid Email Address";
  }
  if (!formProps.code) {
    errors.code = "Required";
  }
  if (!formProps.phoneNumber) {
    errors.phoneNumber = "Required";
  }

  return errors;
};

const mapStateToProps = state => ({
  hotel: state.hotelReducer.hotel,
  sessionId: state.hotelReducer.sessionId,
  searchDate: state.hotelReducer.searchDate,
  pricedTotalFare: state.hotelReducer.pricedTotalFare,
  quotedTotalFare: state.hotelReducer.quotedTotalFare,
  fareBreakup: state.hotelReducer.fareBreakup,
  pricedRooms: state.hotelReducer.pricedRooms,
  rates: state.hotelReducer.rates,
  requestedOccupancies: state.hotelReducer.requestedOccupancies,
  roomPriceInfo: state.hotelReducer.roomPriceInfo,
  roomOccupancies: state.hotelReducer.roomOccupancies,
  rooms: state.hotelReducer.rooms,
  loginDetails: state.loginReducer.loginDetails,
  paymentDetails: state.paymentReducer.paymentDetails,
  getCardDetails: state.cardReducer.getCardDetails,
  bookingConfirm: state.paymentReducer.bookingConfirm
});
const mapDispatchToProps = dispatch => ({
  
  bookingReset: () => dispatch(bookingReset()),
  payment: payload => dispatch(payment(payload)),
  getCard: email => dispatch(getCard(email))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "payment",
    validate: fieldValidation
  })(Payment)
));


//export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(reduxForm({ form: "payment", validate: fieldValidation}))(Payment));

Payment.propTypes = {
  isdivHide: propTypes.bool
}