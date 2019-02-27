import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import queryString from 'query-string'
import DateRangePicker from "react-daterange-picker";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "react-daterange-picker/dist/css/react-calendar.css";
import { map as _map } from "lodash";

import LocationSearch from "./LocationSearch";

import { searchHotel } from "../../../service/hotel/action";

import img_packagesIcon from "../../../asset/images/Packages-Icon.png";
import img_Calendar from "../../../asset/images/Calendar.svg";
import img_SearchIcon from "../../../asset/images/Search Icon.png";
import img_progress from "../../../asset/images/under-construction.png";
import img_flight from "../../../asset/images/airplane-shape.png";
import img_hotal from "../../../asset/images/hotel-building.png";
import img_car from "../../../asset/images/car.png";
import img_activities from "../../../asset/images/activities.png";
import img_clock from '../../../asset/images/car/wall-clock.png';
import img_age from '../../../asset/images/car/ageIcon.png';


const moment = extendMoment(originalMoment);
const today = moment();

const style = {
  margin: "20px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "10%"
}

const staticBounds = {
  "bounds": {
    "rectangle": {
      "bottomRight": {
        "lat": 50.178005,
        "long": 3.921267
      },
      "topLeft": {
        "lat": 50.64359,
        "long": 2.635867
      }
    }
  },
}

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  unavailable: {
    selectable: false,
    color: '',
    label: 'Unavailable',
  }
};

const dateRanges = [
  {
    state: 'unavailable',
    range: moment.range(today.clone().subtract(1, "days"), today.clone()),
  },
];

class SearchTool extends React.Component {
  state = {
    searchPayload: null,
    activeTab: "hotels",
    value: moment.range(today.clone().subtract(1, "days"), today.clone().add(1, 'days')),
    startDate: moment().format("MM/DD/YYYY"),
    endDate: moment().add(1, 'days').format("MM/DD/YYYY"),
    isCalendar: false,
    adult: "1",
    child: "0",
    room: '1',
    childAgeValues: [],
    childCounts: Array.from({ length: 12 }),
    roomCounts: Array.from({ length: 20 })
  };

  getSearchInfo = searchPayload => {
    this.setState({ searchPayload });
  };

  componentWillMount = () => {
    if (window.location.search) {
      const values = queryString.parse(window.location.search);
      this.setState({
        startDate: values.checkin || values.startDate,
        endDate: values.checkout || values.endDate,
        adult: values.adult,
        child: values.child,
        childAgeValues: values.childAgeValues
      })
    }
    console.log("window.location")
  }


  _tabs = [
    { value: "flights", lable: "FLIGHTS", to: '/flight', refimg:img_flight },
    { value: "hotels", lable: "HOTELS", to: '/hotel', refimg:img_hotal },
    { value: "cars", lable: "CARS", to: '/car', refimg:img_car },
    { value: "activities", lable: "ACTIVITIES", to: '/activity',refimg:img_activities },
    { value: "packages", lable: "PACKAGES", to: '/package', refimg: img_packagesIcon }
  ];

  getToday = () => {
    return moment().format("MM/DD/YYYY");
  };

  handleSearch = () => {

    this.setState({ isCalendar: false });

    const { searchPayload, startDate, endDate, adult, child, childAgeValues } = this.state;
   
    const searchInfo = {
      ...searchPayload,
      date: {
        start: startDate,
        end: endDate
      }
    };
    const searchString = {
      checkin: startDate,
      checkout: endDate,
      searchText: searchPayload.searchString,
      adult,
      child,
      childAgeValues
    }
    this.props.history.push('/hotel/search?' + queryString.stringify(searchString))
  };

  //TODO

  carHandleSearch = () =>{
 
  console.log("log")
this.props.history.push('/car/search')
  }

  handleStartDate = e => {
    this.setState({
      isCalendar: true,
      startDate: e.target.value,
      endDate: e.target.value
    });
  };

  handleEndDate = e => {
    this.setState({
      isCalendar: true,
      endDate: e.target.value
    });
   
  };

  onSelect = (value, states) => {
    this.setState({
      value,
      startDate: moment(value.start._d).format("MM/DD/YYYY"),
      isCalendar: false,
      endDate: moment(value.end._d).format("MM/DD/YYYY")
    });
  };

  render() {
    return (
      <div className="mb-3">
        <ul className="tabs">
          {this._tabs.map((each, i) => (
            <li
              key={i}
              className={
                this.props.path === each.to ? "tab-link current" : "tab-link"
              }
              onClick={() => this.props.history.push(each.to)}
              data-tab="tab-1">
              <span className="responNameHide">{each.lable}</span>
              {each.refimg && <span className={each.lable == 'PACKAGES' ? 'respIconSize' :'responIconHide respIconSize' }> <img src={each.refimg} width="20px" alt="" /></span>}
            </li>
          ))}
          <li className="tab-link">
            <i className="fas fa-chevron-right" />
          </li>
        </ul>

        <div id="tab-2" className="tab-content current">
          {this.renderContent()}
        </div>
      </div>
    );
  }
  renderContent = () => {
    const { startDate, endDate, isCalendar, adult, child, room, roomCounts } = this.state;

    switch (this.props.path) {
      case this._tabs[1].to:
        return (
          <React.Fragment>
            <h3 className="tabHeadText">Search and Save on Hotels</h3>
            <div className="selectDivsAl">
              <div className="form-group mb-2">
                <div className="seleboxs">
                  <LocationSearch onSearch={this.getSearchInfo} />
                  <i className="fas fa-map-marker-alt locationIcon" onClick={() => this.getSearchInfo(staticBounds)} />
                </div>
              </div>
              <div className="form-group d-flex flex-row smallColumn mb-0">
                <div className="seleboxs1 flex-column  align-self-start mr-2">
                  <img src={img_Calendar} className="calendImg" alt="" />
                  <input
                    type="text"
                    className="dateInput borderRig"
                    placeholder="Sat,Oct 20"
                    onChange={this.handleStartDate}
                    value={startDate}
                    min={this.getToday()}
                    onFocus={() => this.setState({ isCalendar: true })}
                  />
                  <input
                    type="text"
                    className="dateInput"
                    placeholder="Fri,Oct 26"
                    onChange={this.handleEndDate}
                    value={endDate}
                    min={startDate}
                    onFocus={() => this.setState({ isCalendar: true })}
                  />
                  {isCalendar && <DateRangePicker
                    value={this.state.value}
                    onSelect={this.onSelect}
                    minimumDate={new Date()}
                    numberOfCalendars={2}
                    stateDefinitions={stateDefinitions}
                    dateStates={dateRanges}
                    defaultState="available"
                  />}
                </div>
                <div className="seleboxs2 d-flex flex-row justify-content-center mr-2">
                  <div className="form-group selectDivsAl">
                    <select
                      className="sele-width"
                      value={room}
                      onChange={(e) => this.setState({ room: e.target.value })}
                    >
                      {_map(roomCounts, (each, i) => (
                        <option key={i} value={i + 1}>{i + 1} Room</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-row smallColumn">
                  <div className="form-group selectDivsAl mr-2">
                    <select
                      className="sele-width"
                      value={adult}
                      onChange={(e) => this.setState({ adult: e.target.value })}
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      className="sele-width"
                      value={child}
                      onChange={(e) => this.setState({
                        child: e.target.value,
                        childAgeValues: this.state.childAgeValues.concat('')
                      })}
                    >
                      <option value="0">
                        No Child
                  </option>
                      <option value="1">1 Child </option>
                      <option value="2">2 Children </option>
                      <option value="3">3 Children </option>
                      <option value="4">4 Children </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group d-flex flex-row smallColumn justify-content-end">
                <div className="d-flex flex-row">
                  {this.state.childAgeValues && this.state.childAgeValues.length > 0 && this.state.child>0 && this.renderChildAge()}
                </div>
              </div>

            </div>
            <div className="text-right">
              <button
                type="button"
                className="searchBtn"
                onClick={this.handleSearch}
                disabled={!this.state.searchPayload }
              >
                Search <img src={img_SearchIcon} alt="" />
              </button>
               
            </div>
            {/* disabled={!this.state.searchPayload} */}
          </React.Fragment>
        );
        case this._tabs[2].to:return(
          <React.Fragment>
              <h3 className="tabHeadText">Search and Save on Car Deals</h3>
              <div className="d-flex flex-row smallColumn carSearchOption">
                <div className="flex-column">
									
											<div className="seleLocation">
												<input type="text" className="" placeholder="Pick-up Location"/>
												<i className="fas fa-map-marker-alt locationIcon"></i>
											</div>
							  	
							   </div>
                 <div className="flex-column">
                     <div className="seleDate align-self-start">
                        <img src={img_Calendar}/> 
                       <input type="text" className="dateInput" placeholder="Pick-Up Date"/>
                      </div>
                 </div>
                 <div className="flex-column">
                   <div className="seleTime align-self-start">
                      <img src={img_clock} /> 
                       <input type="text" className="dateInput" placeholder="Pick-Up Time"/>
                    </div>
                 </div>
              </div>

              <div className="d-flex flex-row smallColumn  carSearchOption">
                <div className="flex-column">
								
											<div className="seleLocation">
												<input type="text" className="" placeholder="Drop-Off Location (same as Pick-Up)"/>
												<i className="fas fa-map-marker-alt locationIcon"></i>
											</div>
							  	
							   </div>
                 <div className="flex-column">
                     <div className="seleDate align-self-start">
                        <img src={img_Calendar}/> 
                       <input type="text" className="dateInput" placeholder="Drop-Off Date"/>
                      </div>
                 </div>
                 <div className="flex-column">
                   <div className="seleTime align-self-start">
                      <img src={img_clock}/> 
                       <input type="text" className="dateInput" placeholder="Drop-Off Time"/>
                    </div>
                 </div>
              </div>
              <div className="d-flex flex-row smallColumn  carSearchOption">
                  <div className="flex-column">
                      <div className="seleAge">
                          <img src={img_age} alt="age icon"/>
                          <select ><option value="">Age</option></select>
                      </div>
                  </div>
                </div>

						<div class="text-right"><button type="button" onClick={this.carHandleSearch} className="searchBtn">Search <img src={img_SearchIcon} alt="searchIcon"/></button></div>
          </React.Fragment>
        )
      default:
        return <React.Fragment>
          <div style={{ textAlign: "center" }}>
            <img src={img_progress} style={style} />
            <div className="noHotelText">
              {this._tabs.find(each => each.to === this.props.path)["lable"]} LIMITED ACCESS
              </div>
            <NavLink
              to={"/xeniApp"}
              href=""
              className="forgotLink commonLink"
            >
              Signup
            </NavLink>
          </div>
        </React.Fragment>;
    }
  };

  renderChildAge = () => {
    let { child, childAgeValues, childCounts } = this.state;
    let Age = childAgeValues && childAgeValues.length > 0 && Array(parseInt(child)).fill('');
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="age-box borLeft">Children Aged:</label>
        </div>
        {childAgeValues && childAgeValues.length > 0 && Age.map((each, i) => {
          return (
            <div key={i} className="form-group">
              <select
                className="age-box"
                onChange={(e) => {
                  childAgeValues[i] = e.target.value;
                  this.forceUpdate()
                }}
              >
                {this.state.childAgeValues.length > 0 && <option value={this.state.childAgeValues[i] || 0}>{this.state.childAgeValues[i] || "Age"}</option>}
                {childCounts.map((each, i) => {
                  return (
                    <option key={i} value={i + 1} >{i + 1}  </option>
                  )
                })}
              </select>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

}

SearchTool.propTypes = {
  // onSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching
});

const mapDispatchToProps = dispatch => ({
  searchHotel: searchInfo => dispatch(searchHotel(searchInfo))
});

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(SearchTool));
