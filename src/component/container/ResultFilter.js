import React, { Component } from "react";
import { connect } from "react-redux";

import { filterHotel, searchByHotelName, searchByRating,priceFiltering } from "../../service/hotel/action";
import img_star5 from "../../asset/images/star5.png";
import img_star4 from "../../asset/images/star4.png";
import img_star3 from "../../asset/images/star3.png";
import img_star2 from "../../asset/images/star2.png";
import img_star1 from "../../asset/images/star1.png";
import img_block from "../../asset/images/block.png";
import img_wifi from "../../asset/images/wifi.png";
import img_parking from "../../asset/images/parking-sign.png";
import img_minibus from "../../asset/images/minibus.png";
import img_breakfast from "../../asset/images/breakfast.png";
import img_onlinebooking from "../../asset/images/online-booking.png";
import InputRange from 'react-input-range';
import downArrow from '../../asset/images/selarrow.png';
import '../../component/container/Result.css'
import { map as _map, countBy as _countBy, filter as _filter, max as _max, min as _min, forEach as _forEach } from 'lodash'
import { normalize } from "path";

class ResultFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        min: 0,
        max: 1000
      },
      options: [],
      isRating: [false, false, false, false, false],
      ratStar: null,
      arr: [],
      searchStr: "",
      isFliterExpand: false,
      hotellist: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const { hotelList } = nextProps;
    this.setState({ hotellist: hotelList });
    if (nextProps.searchPrice !== this.props.searchPrice) {
      this.setState({ values: nextProps.searchPrice });
    }
    if (
      nextProps.isHotelRest !== this.props.isHotelRest &&
      nextProps.isHotelRest == true
    ) {
      // let isRating = [...this.state.isRating];
      // for (let i = 0; i < 5; i++) {
      //   isRating[i] = false;
      // }
      // this.setState({ isRating });
    }
  }

  handleChange = value => {
    console.log("value...........", value)
      const price = _filter(this.props.hotelStarListCount, (each, i) => {
        return value.max < 1000 ? each.fare.baseFare <= value.max :value.min > 0 ? each.fare.baseFare  >= value.min && value.max  : this.state.hotellist;
      });
     this.props.searchByRating(price);
    if (value.min >= 0 && value.max <= 10000) {
      this.setState({ values: value });
    }
  };

  getFilterResult = value => {
    this.getFilterInfo(value);
  };

  getFilterInfo = value => {
    const { minHotelRating, maxHotelRating, selectedCountryCode } = this.props;
    const payload = {
      price: {
        min: value.min,
        max: value.max
      },
      currency: selectedCountryCode
    };
    this.props.filterHotel(
      this.props.sessionId,
      payload.price,
      // payload.currency,
      // minHotelRating,
      // maxHotelRating
    );
  };
  onChangeRating(e) {
    const options = this.state.options;
    let index;
    if (e.target.checked) {
      options.push(+e.target.value);
      options.push(+e.target.value + 0.5)
    } else {
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
      index = options.indexOf(+e.target.value + 0.5)
      options.splice(index, 1)
    }
    this.setState({ options: options });
    const { hotelList, hotelStarListCount } = this.props;
    const ratingFilter = _filter(hotelStarListCount, function (item, i) {
      if (options.length > 0) {
        if (options.includes(item.rating)) {
          return item;
        }
      } else {
        return hotelList;
      }
    });

    this.props.searchByRating(ratingFilter);
  }
  // toggleRating = e => {
  //   let ratStar = e.target.name;
  //   const { selectedCountryCode } = this.props;
  //   var isRating = [this.state.isRating];
  //       isRating[ratStar] = true;
  //   console.log("sdfsffssf",isRating)
  //   // isRating = isRating.reverse();

  //   this.setState({ isRating, ratStar });
  //   const payload = {
  //     price: {
  //       min: this.state.values.min,
  //       max: this.state.values.max
  //     }
  //   };
  //   // this.props.filterHotel(
  //   //   this.props.sessionId,
  //   //   payload.price,
  //   //   ratStar,
  //   //   ratStar,
  //   //   selectedCountryCode
  //   // );
  //   // const ratingFilter = this.props.hotelStarListCount;
  //   // let arr =[2,5]
  //   // //  const ratingsss= _map(arr,_filter(this.props.hotelStarListCount, function(item){return item.rating == ratStar;}))
  //   //  const ratingsss = _map(arr, (each, i) => _filter(
  //   //      this.props.hotelStarListCount,
  //   //      function(item) {
  //   //        return item.rating == each;
  //   //      }
  //   //    ));

  //   const ratingFilter = _filter(this.props.hotelStarListCount, function(item) {
  //       return  item.rating <= ratStar
  //   });
  //   console.log("ratingfilter", ratingFilter);
  //   this.props.searchByRating(ratingFilter);
  // };

  _filterRatingList = [
    { label: "5 Stars", value: 5, refImg: img_star5 },
    { label: "4.5 Stars", value: 4.5, refImg: img_star2 },
    { label: "4 Stars", value: 4, refImg: img_star4 },
    { label: "3.5 Stars", value: 3.5, refImg: img_star2 },
    { label: "3 Stars", value: 3, refImg: img_star3 },
    { label: "2.5 Stars", value: 2.5, refImg: img_star2 },
    { label: "2 Stars", value: 2, refImg: img_star2 },
    { label: "1.5 Stars", value: 1.5, refImg: img_star2 },
    { label: "1 Stars", value: 1, refImg: img_star2 },
    { label: "0 Stars", value: 0, refImg: img_star2 }
    // { label: "1 Stars", value: 1, refImg: img_star1 }
  ];

  _defAccomodation = [
    { label: "Hotel", value: "Hotel" },
    { label: "Motel", value: "Hotel" },
    { label: "Apart-Hotel", value: "Hotel" },
    { label: "TownHouse", value: "Hotel" },
    { label: "VacationHouse", value: "Hotel" }
  ];

  _defNghood = [
    { label: "NewYork (and Vicinity)", value: "NewYorkandVicinity" },
    { label: " Manhattan", value: "Manhattan" },
    { label: " Brooklyn", value: "Brooklyn" },
    { label: " Queens", value: "Queens" },
    { label: " Midtown", value: "Midtown" },
    { label: " Long Istland City", value: "LongIstlandCity" }
  ];

  _defAmenities = [
    {
      label: "Free Cancellation",
      value: "FreeCancellation"
      // refImg: img_block
    },
    {
      label: "Free Wifi",
      value: "FreeWifi"
      // refImg: img_wifi
    },
    {
      label: "Free parking",
      value: "Freeparking"
      //  refImg: img_parking
    },
    {
      label: "Free Airport Shuttle",
      value: "FreeAirportShuttle"
      // refImg: img_minibus
    },
    {
      label: "Breakfast Included",
      value: "BreakfastIncluded"
      // refImg: img_breakfast
    },
    {
      label: "Reseve Now, Pay Later",
      value: "ReseveNowPayLater"
      // refImg: img_onlinebooking
    }
  ];
  searchByHotel = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.props.searchByHotelName(value);
    });
  };
  render() {
    const { isRating, searchStr } = this.state;
    const { isFliterExpand } = this.state;
    const { hotelList, hotelStarListCount } = this.props;
    const result = _countBy(_map(hotelStarListCount, "rating"));
    const filtetprice=   _filter(hotelList,(each,i)=>{
        return each.fare.baseFare <= this.state.values.max;
      })
      console.log("filter price", filtetprice);
    return (
      <div
        className={
          isFliterExpand
            ? "filterBg flex-column align-self-start showFilterBg"
            : "filterBg flex-column align-self-start"
        }
      >
        <h2>FILTER BY</h2>

        <div
          className="filterTitle"
          onClick={() =>
            this.setState({
              isFliterExpand: !isFliterExpand
            })
          }
        >
          {" "}
          <h2>
            FILTER BY
            <img src={downArrow} className="downArrowImg" />
          </h2>
        </div>
        <div className="respDeskShow">
          <div>
            <h4>Search By</h4>
            <div className="searchInPut">
              <input
                type="text"
                className="searchByName"
                placeholder="Hotel Name"
                name="searchStr"
                value={searchStr}
                onChange={this.searchByHotel}
              />
            </div>
          </div>
          <div>
            <h4>Price Range</h4>
            <div className="slideRange">
              <InputRange
                maxValue={1000}
                minValue={0}
                formatLabel={value => ``}
                /* onChangeComplete={value => this.getFilterResult(value)}*/
                onChange={value => this.handleChange(value)}
                value={this.state.values}
              />
            </div>
            <span className="rangeVauleLeft">${this.state.values.min}</span>
            <span className="rangeVauleRight">${this.state.values.max}</span>
          </div>
          <div>
            <h4> Star Rating</h4>
            <ul className="priceRange">
              {this._filterRatingList.map((each, i) => (
                <li
                  key={i}
                  className={
                    each.value === 2.5
                      ? "d-none"
                      : each.value === 3.5
                        ? "d-none"
                        : each.value === 4.5
                          ? "d-none"
                          : each.value === 1.5
                            ? "d-none"
                            : each.value === 0
                              ? "d-none"
                              : each.value === 1
                                ? "d-none"
                                : ""
                  }
                >
                  <input
                    className="filtercheckbox"
                    id={`priceRange_${i}`}
                    type="checkbox"
                    /* name={each.value} */
                    value={each.value}
                    /* checked={isRating[each.value]} */
                    /* onChange={this.toggleRating} */
                    onChange={this.onChangeRating.bind(this)}
                  />
                  <label htmlFor={`priceRange_${i}`}>
                    <img alt="" src={each.refImg} />
                    <p>{each.label} (
                    
                      {result[each.value + 0.5]
                        ? result[each.value] + result[each.value + 0.5] || result[each.value + 0.5]
                        : result[each.value] || 0}
                   
                    ) </p>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Accomodation Type</h4>
            <ul>
              {this._defAccomodation.map((each, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    id={`acc_${i}`}
                    name={each.value}
                    className="filtercheckbox"
                    value=""
                    disabled
                  />
                  <label htmlFor={`acc_${i}`}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Neighborhood</h4>
            {/* <ul>
              {this._defNghood.map((each, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    id={`nghood_${i}`}
                    name={each.value}
                    className="filtercheckbox"
                    value=""
                    disabled
                  />
                  <label htmlFor={`nghood_${i}`}>{each.label}</label>
                </li>
              ))}
            </ul> */}
            <p style={{ fontWeight: normalize, fontSize: "13px", color: '#fff' }} > Comming Soon </p>

            {/* <ul>
              {this._defNghood.map((each, i) => <li key={i}>
                  <input type="checkbox" id={`nghood_${i}`} name={each.value} className="filtercheckbox" value="" disabled />
                  <label htmlFor={`nghood_${i}`}>{each.label}</label>
                </li>)}
            </ul> */}
          </div>
          <div>
            <h4>Amenities</h4>
            <ul>
              {this._defAmenities.map((each, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    id={`ament_${i}`}
                    name={each.value}
                    className="filtercheckbox"
                    value=""
                    disabled
                  />
                  <label htmlFor={`ament_${i}`}>
                    <img alt="" src={each.refImg} />
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sessionId: state.hotelReducer.sessionId,
  searchPrice: state.hotelReducer.searchPrice,
  minHotelRating: state.hotelReducer.minHotelRating,
  maxHotelRating: state.hotelReducer.maxHotelRating,
  isHotelRest: state.hotelReducer.isHotelRest,
  hotel: state.hotelReducer.hotel,
  hotelList: state.hotelReducer.hotelList,
  selectedCountryCode: state.commonReducer.selectedCountryCode,
  hotelStarListCount: state.hotelReducer.hotelStarListCount
});
const mapDispatchToProps = dispatch => ({
  filterHotel: (sessionId, price, minHotelRating, maxHotelRating) =>
    dispatch(filterHotel(sessionId, price, minHotelRating, maxHotelRating)),
  searchByHotelName: hotelFilterdStr =>
    dispatch(searchByHotelName(hotelFilterdStr)),
  searchByRating: ratingFilter => dispatch(searchByRating(ratingFilter)),
  priceFiltering: ratingFilter => dispatch(priceFiltering(ratingFilter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultFilter);
