import axios from "../Axios";
import actionType from "./actionType";
import URL from "./../../asset/configUrl";
import {
  loadingGifSearch,
  stopGifSearching
} from "../common/action";

export const payment = payload => dispatch => {
  dispatch(loadingGifSearch())
  axios
    .post(URL.hotel.ROOM_BOOKING, payload)
    .then(res => {
      console.log('pay status', res)
      dispatch(stopGifSearching())
      dispatch({ 
        type: actionType.PAYMENT_SUCCESS,
         payload: res.data
        });
    })
    .catch(error => {
      console.log('pay FAI', error)
      dispatch(stopGifSearching())
      dispatch({
        type: actionType.PAYMENT_FAILURE
      });
    });
};
export const bookingReset = () => dispatch => {
  dispatch({
    type: 'bookingReset'
  })
}

export const paymentWithSaveCard = payload=>dispatch=>{
  axios
  .post(`http://localhost:8080/api/hotel/booking/savedcards`,payload)
  .then(res=>{
      dispatch({
        type: actionType.PAYMENTWITHCARD_SUCCESS,
        payload: res.data
      });
   })
   .catch(error=>{
     dispatch({
       type:actionType.PAYMENTWITHCARD_FAILURE,
       payload:error.response.data
     })
   })  
}
