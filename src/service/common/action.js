import _axios from "../Axios";
import URL from "../../asset/configUrl";
import actionType from "./actionType";

export const loadingSearch = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_SEARCH
  });
};
export const stopSearching = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_SEARCH
  });
};
export const loadingGifSearch = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_GIF_SEARCH
  });
};
export const stopGifSearching = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_GIF_SEARCH
  });
};


export const init = () => dispatch => {
  _axios
    .get(URL.init)
    .then((res, ...rest) => {
      console.log("response",res)
      dispatch({
        type: actionType.COUNTRYCODE_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.COUNTRYCODE_FAILURE,
        //error: error.response.data
      });
    });
};
export const code = (concode) => dispatch => {
      dispatch({
        type: actionType.SELECTED_COUNTRYCODE_SUCCESS,
        payload: concode
      });
};


