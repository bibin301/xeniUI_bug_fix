import axios from "../Axios";
import actionType from "./actionType";
import URL from "./../../asset/configUrl";
import {
  toast,
  Flip
} from "react-toastify";
import {
  loadingSearch,
  stopSearching,
  loadingFailureSearch,
  stopFailureSearching
} from "../loader/action"
import {
  loadingGifSearch,
  stopGifSearching
} from "../common/action";


export const loadingSearchFilter = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_SEARCH_FILTER
  });
};
export const searchByHotelName = (hotelFilterStr) => dispatch => {
  dispatch({
    type: actionType.SEARCHBY_HOTEL_NAME,
    payload: hotelFilterStr
  });
};
export const searchByRating = (ratingFilter) => dispatch => {
  dispatch(loadingGifSearch());
  setTimeout(function() {
     dispatch(stopGifSearching());
      dispatch({
        type: actionType.SEARCHBY_RATING,
        payload: ratingFilter
      });
  }, 300);

};
export const priceFiltering = (ratingFilter) => dispatch => {
   dispatch(loadingGifSearch());
   setTimeout(function() {
     dispatch({
       type: actionType.PRICE_FILTER,
       payload: ratingFilter
     });
   }, 300);
  
};
export const stopSearchingFilter = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_SEARCH_FILTER
  });
};

export const searchHotel = searchPayload => dispatch => {
  const {
    guest,
    date,
    bounds,
    searchString,
    adult,
    child,
    childAgeValues,
    currency,
    paging
  } = searchPayload;
  // const { guest, date, bounds, searchString ,currency} = searchPayload;
  const stayPeriod = {
    ...date
  };
  dispatch(loadingGifSearch())
  axios
    .post(URL.hotel.HOTEL_SEARCH, {
      currency,
      searchString,
      paging,
      adult: {
        type: "adult",
        count: adult
      },
      child: {
        type: "child",
        count: child
      },
      stayPeriod,
      childAgeValues,
      bounds
    })
    .then(res => {
      dispatch(stopGifSearching())

      dispatch({
        type: actionType.HOTEL_SEARCH_SUCCESS,
        inputPayload: date,
        page:paging,
        payload: res.data.data
      });

      dispatch(loadingSearch());
      setTimeout(() => {
        dispatch(stopSearching());
      }, 2000)

    })
    .catch(error => {
      dispatch(stopGifSearching())
      dispatch({
        type: actionType.HOTEL_SEARCH_FAILURE,
        //error: error.response.data.data
      });

      dispatch(stopSearching());
      dispatch(loadingFailureSearch());
      setTimeout(() => {
        dispatch(stopFailureSearching())
      }, 2000)
    });
};

export const filterHotel = (sessionId, price, currency) => dispatch => {
  dispatch(loadingSearch());
  dispatch(loadingGifSearch());
  axios
    .post("http://localhost:8080/api/hotel/filter", {
      sessionId,
      price,
      // minHotelRating,
      // maxHotelRating,
      // pageSize,
      currency
    })
    .then(res => {
      dispatch(stopGifSearching());

      if (res.data.statusCode === 404) {
        dispatch({
          type: actionType.HOTEL_FILTER_FAILURE,
          payload: {
            hotels: []
          },
          inputPayload: {
            price,
            // pageSize,
            // minHotelRating,
            // maxHotelRating
          }
        });

        dispatch(loadingSearch());
        setTimeout(() => {
          dispatch(stopSearching());
        }, 2000)

      } else {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: res.data.data,
          inputPayload: {
            price: price,
            // pageSize: pageSize,
            // minHotelRating: minHotelRating,
            // maxHotelRating: maxHotelRating
          }
        });

        dispatch(loadingSearch());
        dispatch(stopSearching());

        dispatch(loadingFailureSearch());
        setTimeout(() => {
          dispatch(stopFailureSearching())
        }, 2000)

      }
    })
    .catch(error => {
      dispatch(loadingGifSearch())
      dispatch({
        type: actionType.HOTEL_FILTER_FAILURE,
        error: error
      });


      dispatch(loadingFailureSearch());
      setTimeout(() => {
        dispatch(stopFailureSearching())
      }, 2000)

    });
};

export const filterHotelLoadMore = (
 sessionId,
  price,
  paging
) => dispatch => {
dispatch(loadingGifSearch());
  axios
    .post(URL.hotel.HOTEL_FILTER, {
      sessionId,
      price,
      paging
    })
    .then(res => {
      console.log("hotel Filter ",res,paging)
      dispatch(stopGifSearching());
      dispatch(stopSearchingFilter());
      if (res.data.statusCode === 404) {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: {
            hotels: []
          },
          inputPayload:paging
          // inputPayload: {
          //   price: price,
          //   pageSize: pageSize
          // }
        });
        // _toast({
        //   type: "error",
        //   message: res.data.data.Message,
        //   position: toast.POSITION.BOTTOM_RIGHT
        // });
      } else {
        
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: res.data.data,
          inputPayload: paging
          // inputPayload: {
          //   price: price,
          //   pageSize: pageSize
          // }
        });
        // _toast({
        //   type: "success",
        //   message: res.data.message,
        //   position: toast.POSITION.BOTTOM_RIGHT
        // });
      }
    })
    // .catch(error => {
    //   dispatch({
    //     type: actionType.HOTEL_FILTER_FAILURE,
    //     error: error.response.data.data
    //   });
    //   // _toast({
    //   //   type: "error",
    //   //   message: "Invalid Request",
    //   //   position: toast.POSITION.BOTTOM_RIGHT
    //   // });
    // });
};

export const searchRoom = (
  sessionId,
  hotelId,
  currency
) => dispatch => {
  dispatch(loadingGifSearch())
  axios
    .post(URL.hotel.ROOM_SEARCH, {
      sessionId,
      hotelId,
      currency
    })
    .then(res => {
      dispatch(stopGifSearching())
      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        payload: res.data.data
      });

      dispatch(loadingSearch());
      setTimeout(() => {
        dispatch(stopSearching());
      }, 2000)

    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch(stopGifSearching())
        dispatch({
          type: actionType.ROOM_SEARCH_SUCCESS,
          payload: {
            hotel: null,
            rates: [],
            recommendations: [],
            roomOccupancies: [],
            rooms: []
          }
        });

        dispatch(stopSearching());

        dispatch(loadingFailureSearch());
        setTimeout(() => {
          dispatch(stopFailureSearching())
        }, 2000)

      } else {
        dispatch({
          type: actionType.ROOM_SEARCH_FAILURE,
          error: error
        });

        dispatch(stopSearching());

        dispatch(loadingFailureSearch());
        setTimeout(() => {
          dispatch(stopFailureSearching())
        }, 2000)

      }
    });
};

export const searchRoomStateless = payload => dispatch => {
  dispatch(loadingGifSearch())
  axios
    .post(URL.hotel.ROOM_SEARCHSTATELESS, payload)
    .then(res => {
      dispatch(loadingGifSearch())

      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        payload: res.data,
        startDate: payload.startDate,
        endDate: payload.endDate
      });

      dispatch(loadingSearch());
      setTimeout(() => {
        dispatch(stopSearching());
      }, 2000)


    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        error: error
      });


      dispatch(stopSearching());

      dispatch(loadingFailureSearch());
      setTimeout(() => {
        dispatch(stopFailureSearching())
      }, 2000)


    });
};

export const getRoomPrice = (
  payload
) => dispatch => {
  dispatch(loadingGifSearch())
  axios
    .post(URL.hotel.ROOM_PRICE, payload)
    .then(res => {
      dispatch(stopGifSearching());
      dispatch({
        type: actionType.ROOM_PRICE_SUCCESS,
        payload: res.data.data
      });

      dispatch(loadingSearch());
      setTimeout(() => {
        dispatch(stopSearching());
      }, 2000)

    })
    .catch(error => {

      dispatch({
        type: actionType.ROOM_PRICE_FAILURE,
        //error: error.response.data.data
      });

      dispatch(stopSearching());
      dispatch(loadingFailureSearch());
      setTimeout(() => {
        dispatch(stopFailureSearching())
      }, 2000)
    });
};

export const bookRoom = roombookpayload => dispatch => {
  axios
    .post(URL.hotel.ROOM_PRICE, {
      roombookpayload
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_BOOKING_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_BOOKING_FAILURE,
        error: error.response.data.data
      });
    });
};

export const cancelRoom = bookingId => dispatch => {
  axios
    .post(URL.hotel.ROOM_PRICE, {
      bookingId
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_CANCEL_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_CANCEL_FAILURE,
        error: error.response.data.data
      });
    });
};

// toaster  function
// const _toast = ({
//   type,
//   message,
//   position
// }) => {
//   switch (type) {
//     case "success":
//       toast.success(message, {
//         position: position
//       });
//       break;
//     case "error":
//       toast.error(message, {
//         position: position
//       });
//       break;
//     case "warning":
//       break;
//       toast.warn(message, {
//         position: position
//       });
//     case "info":
//       break;
//       toast.info(message, {
//         position: position
//       });
//     case "default":
//       break;
//       toast(message, {
//         position: position
//       });
//     default:
//       break;
//   }
// };