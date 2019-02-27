import actionType from "./actionType";
import { filter as _filter } from 'lodash'
const InitialState = {
  // data from user input
  searchDate: { start: null, end: null },
  // data from hotel search/filter
  hotelCount: null,
  completedSuppliers: null,
  hotelList: [],
  sessionId: null,
  currency: "USD",
  // values got from user input
  searchPrice: { min: 0, max: 10000 },
  pageSize: 10,
  minHotelRating: 1,
  maxHotelRating: 5,
  hotelFilterStr: "",
  // data from room search
  hotel: null,
  rateList: [],
  recommendations: [],
  roomOccupanciesList: [],
  roomList: [],
  isHotelRest: false,
  // data from get Price
  fareBreakup: null,
  // hotel: null,
  isRateAvailable: false,
  isReserve: false,
  pricedRooms: [],
  rooms: [],
  pricedTotalFare: null,
  quotedTotalFare: null,
  rateOccupancies: [],
  requestedOccupancies: [],
  // roomOccupancies: [],

  hotelsearch: null,
  hotelFilter: null,
  // roomList: null,
  roomPrice: null,
  roomBooking: null,
  roomCancel: null,
  isSearching: false,
  isSearchingFilter: false,
  hotelStarListCount: [],
  hotelFilterRating: "",
  roomPriceInfo: null
};
const reducer = (state = InitialState, action) => {
  console.log("reducer console", action);
  switch (action.type) {
    case actionType.HOTEL_SEARCH_SUCCESS:
      const {
        hotelCount,
        completedSuppliers,
        hotels,
        sessionId
      } = action.payload;
      // console.log("hotels---------------> ",_filter(hotels,(each,i)=>{return each.rating >= 2}))
      return {
        ...state,
        searchDate: action.inputPayload,
        hotelCount,
        completedSuppliers,
        sessionId,
        hotelList: _filter(hotels, (each, i) => { return each.rating >= 2 }),
        hotelStarListCount: _filter(hotels, (each, i) => { return each.rating >= 2 }),
        isSearching: false,
        isReserve: false,
        //Whenever new search happens following values should be rest
        searchPrice: { min: 0, max: 10000 },
        paging: action.page,
        minHotelRating: 1,
        maxHotelRating: 5,
        isHotelRest: true,
        hotelsearch: null
      };
    case actionType.HOTEL_SEARCH_FAILURE:
      return {
        ...state,
        hotelsearch: action.error,
        isSearching: false,
        hotelList: [],
        hotelCount: null
      };
    case actionType.HOTEL_FILTER_SUCCESS:
    console.log("success",action.inputPayload)
      return {
        ...state,
        hotelList: state.hotelList.concat(_filter(action.payload.hotels, (each, i) => { return each.rating >= 2 })),
        // searchPrice: action.inputPayload.price,
        hotelStarListCount:state.hotelList.concat(_filter(action.payload.hotels, (each, i) => { return each.rating >= 2 })),
        paging: action.inputPayload,
        // minHotelRating: action.inputPayload.minHotelRating,
        // maxHotelRating: action.inputPayload.maxHotelRating,
        isSearching: false,
        isReserve: false,
        isHotelRest: false
      };
    case actionType.HOTEL_FILTER_FAILURE:
      return {
        ...state,
        hotelList: [],
        isSearching: false
      };
    case actionType.ROOM_SEARCH_SUCCESS:
      const {
        hotel,
        rates,
        recommendations,
        roomOccupancies,
        rooms
      } = action.payload;
  
      return {
        ...state,
        sessionId: action.payload.sessionId,
        hotel,
        recommendations,
        rateList: rates,
        roomOccupanciesList: roomOccupancies,
        roomList: rooms,
        isSearching: false,
        searchDate: { start: action.startDate, end: action.endDate },
        isReserve: false
      };
    case actionType.ROOM_SEARCH_FAILURE:
      return {
        ...state,
        // roomList: action.error,
        isSearching: false
      };
    case actionType.ROOM_PRICE_SUCCESS:
      // const { hotel,
      //   fareBreakup,
      //   isRateAvailable,
      //   pricedRooms,
      //   pricedTotalFare,
      //   quotedTotalFare,
      //   rateOccupancies,
      //   requestedOccupancies,
      //   roomOccupancies, } = action.payload;
      return {
        ...state,
        pricedRooms:action.payload,
        roomPriceInfo: action.payload,
        isReserve: true,
        isSearching: false
      };
    case actionType.ROOM_PRICE_FAILURE:
      return {
        ...state,
        roomPrice: action.error
      };
    case actionType.ROOM_BOOKING_SUCCESS:
      return {
        ...state,
        roomBooking: action.payload
      };
    case actionType.ROOM_BOOKING_FAILURE:
      return {
        ...state,
        roomBooking: action.error
      };
    case actionType.ROOM_CANCEL_SUCCESS:
      return {
        ...state,
        roomCancel: action.payload
      };
    case actionType.ROOM_CANCEL_FAILURE:
      return {
        ...state,
        roomCancel: action.error
      };
    case actionType.ROOM_SEARCHSTATELESS_SUCCESS:
      return {
        ...state,
        roomCancel: action.payload
      };
    case actionType.ROOM_SEARCHSTATELESS_FAILURE:
      return {
        ...state,
        roomCancel: action.error
      };
    case actionType.ENABLE_LOADING_SEARCH:
      return {
        ...state,
        isSearching: true
      };
    case actionType.ENABLE_LOADING_SEARCH_FILTER:
      return {
        ...state,
        isSearchingFilter: true
      };
    case actionType.DISABLE_LOADING_SEARCH:
      return {
        ...state,
        isSearching: false
      };
    case actionType.DISABLE_LOADING_SEARCH_FILTER:
      return {
        ...state,
        isSearchingFilter: false
      };
    case actionType.SEARCHBY_HOTEL_NAME:
      return {
        ...state,
        hotelFilterStr: action.payload
      };
    case actionType.SEARCHBY_RATING:
      return {
        ...state,
        hotelList: action.payload
      };
     case actionType.PRICE_FILTER:
       return {
         ...state,
         hotelList: action.payload
       };
    default:
      return state;
  }
};
export default reducer;
