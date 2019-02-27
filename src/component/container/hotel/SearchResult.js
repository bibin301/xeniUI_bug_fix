import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { filter as _filter } from 'lodash';

import ResultFilter from "../ResultFilter";

import { searchRoom, searchHotel, filterHotelLoadMore } from '../../../service/hotel/action';

import HotelCard from "../../presentational/HotelCard";
import AlertHotelCard from "../../presentational/AlertHotelCard";
import Loading from '../../Loading';
import openNewTab from "../../../asset/images/dashboard/resize.png";

import img_down from "../../../asset/images/downarrow.png";

const values = queryString.parse(window.location.search)

class SearchResult extends React.Component {
  state = {

    items: Array.from({ length: 20 }),
    hasMoreItems: true,
    checkinDate: values.checkin,
    checkoutDate: values.checkout,
    visible: 30,
    pageNo: 1,
    pageSize: 30

  };

  componentDidMount() {
    if (!this.props.sessionId) {
      this.getHotelList(this.props.location);
    }
    if (this.props.searchByHotel.length == 0) {
      this.getHotelList(this.props.location);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.getHotelList(newProps.location);
    }
  }

  getHotelList = location => {
    const values = queryString.parse(location.search);
    const {
      searchText,
      checkin,
      checkout,
      adult,
      child,
      childAgeValues
    } = values;
    const { selectedCountryCode } = this.props;
    this.setState({ checkinDate: checkin, checkoutDate: checkout });
    const searchInfo = {
      currency: selectedCountryCode,
      searchString: searchText,
      paging: {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize
      },
      date: {
        start: checkin,
        end: checkout
      },
      adult,
      child,
      childAgeValues
    };
    this.props.searchHotel(searchInfo);
  };

  handleOnSelectRoom = hotelId => {
    const { sessionId, selectedCountryCode } = this.props;

    const values = queryString.parse(window.location.search);
    const {
      checkin,
      checkout,
      adult,
      child,
      childAgeValues,
      searchText
    } = values;

    const searchString = {
      currency: selectedCountryCode,
      sessionId,
      hotelId,
      checkin,
      checkout,
      adult,
      child,
      childAgeValues,
      searchText
    };
    this.props.searchRoom(sessionId, hotelId, selectedCountryCode);
    this.props.history.push(
      "/hotel/rooms?" + queryString.stringify(searchString)
    );
  };

  loadMore = () => {

    const { sessionId, searchPrice ,paging} = this.props;
    const page = {
      pageNo: paging.pageNo + 1,
      pageSize: 30
    };
    this.props.filterHotelLoadMore(sessionId, searchPrice, page);
  };
 
  render() {
    const { isSearching, searchByHotel, searchDate } = this.props;
    //  const loader = <div className="loader">Loading ...</div>;
    const { checkinDate, checkoutDate } = this.state;
    // TODO : if infinity issue persist un command following things
    const values = queryString.parse(window.location.search);
    const checkin = values.checkin;
    const checkout = values.checkout;
    console.log("this. paging", this.props.hotelList.length,this.props.searchByHotel.length);
    return (
      <div className="d-flex flex-row tab-column justify-content-start">
        <ResultFilter />
        <div className="filterResult">
          {!isSearching && (
            <React.Fragment>
              {/* <button className="newTabBtn" onClick={() => window.open(window.location, "_blank")}><img src={openNewTab} /> Open in new tab</button> */}

              <div className="cardDetailsHowBg" id="content">
                {/* <InfiniteScroll
                dataLength={searchByHotel.length && this.props.isSearchingFilter}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                // loader={loader}
                pageStart={0}
                scrollableTarget="content"
              > */}

                {searchByHotel.length && this.props.isSearchingFilter ? (
                  <div className="loaderbg1">
                    <div id="loader" />
                  </div>
                ) : null}
                {searchByHotel.length ? (
                  searchByHotel.map((hotel, index) => (
                    <HotelCard
                      key={index}
                      checkout={checkout}
                      checkin={checkin}
                      onSelectHotel={this.handleOnSelectRoom}
                      hotel={hotel}
                    />
                  ))
                ) : (
                  <AlertHotelCard alertInfo="No Hotels Available" />
                )}
                {/* </InfiniteScroll> */}
                {this.props.hotelList && this.props.hotelList.length >= 30 ?
                <div className="text-center">
                  <button type='button' className='clickMoreBtn searchBtn' onClick={this.loadMore}><img src={img_down} alt='down' /></button>
                </div> : null}
             
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const FilterdHotelList = (list, searchStr) => {
  return _filter(list, (hotelName) => {
    return hotelName.name.toLowerCase().includes(searchStr.toLowerCase())
  })
}

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching,
  hotelList: state.hotelReducer.hotelList,
  hotelCount: state.hotelReducer.hotelCount,
  sessionId: state.hotelReducer.sessionId,
  searchPrice: state.hotelReducer.searchPrice,
  searchDate: state.hotelReducer.searchDate,
  currency: state.hotelReducer.currency,
  paging: state.hotelReducer.paging,
  searchByHotel: FilterdHotelList(state.hotelReducer.hotelList, state.hotelReducer.hotelFilterStr),
  selectedCountryCode: state.commonReducer.selectedCountryCode

});
const mapDispatchToProps = dispatch => ({
  searchHotel: searchInfo => dispatch(searchHotel(searchInfo)),
  searchRoom: (sessionId, hotelId, selectedCountryCode) => dispatch(searchRoom(sessionId, hotelId, selectedCountryCode)),
  filterHotelLoadMore: (sessionId, searchPrice, PerpageSize) => dispatch(filterHotelLoadMore(sessionId, searchPrice, PerpageSize))
})
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult));