import axios from "../Axios";
import actionType from "../login/actionType";
import URL from "../../asset/configUrl";
import { toast } from "react-toastify";
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

export const googleLogin = googlepayload => dispatch => {
   
  axios
    .post(URL.USER_GOOGLE_LOGIN, googlepayload) 
    .then(res => {
      dispatch(loadingGifSearch());
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data));
      if (res.status == 200) {
        dispatch(stopGifSearching());
        dispatch({
          type: actionType.LOGIN_SUCCESS,
          payload: res.data.data
        });
        _toast({
          type: "success",
          message: "Logged in successfully",
          position: toast.POSITION.TOP_CENTER
        });
      }
      else {
        _toast({
          type: "warning",
          message: res.data.message,
          position: toast.POSITION.TOP_CENTER
        });
      }
    })
    .catch(error => {
      dispatch(stopGifSearching());
      dispatch({
        type: actionType.LOGIN_FAILURE,
        payload: error.response.data
      });
      _toast({
        type: "error",
        message: error.response.data.message,
        position: toast.POSITION.TOP_CENTER
      });
    });
};

export const signUpInfo = signuppayload => dispatch => {
  dispatch(loadingGifSearch());
  axios
    .post(URL.USER_SIGNUP, signuppayload)
    .then(res => {
      console.log("usetr",res.data)
      dispatch(stopGifSearching());
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data));
      dispatch({
        type: actionType.SIGNUP_SUCCESS,
        payload: res.data
      });
      _toast({
        type: "success",
        message: "Thanks for Registering with Us , Welcome to Xeniapp",
        // message: res.data.message,
        position: toast.POSITION.TOP_CENTER
      });
    })
    .catch(error => {
      console.log("error", error.response.data.data);
      dispatch(stopGifSearching());
      dispatch({
        type: actionType.SIGNUP_FAILURE,
        error: error.response.data.data
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.TOP_CENTER
      });
    
    });
};

export const logOut = () => dispatch => {

  dispatch(loadingGifSearch());
  // sessionStorage.clear()
   sessionStorage.clear(loginInfo);
   //sessionStorage.clear(userLogin)
  
  dispatch({
    type: actionType.LOGOUT_SUCCESS
  });
  dispatch(stopGifSearching());
  _toast({
    type: "success",
    message: "Logged out successfully",
    position: toast.POSITION.TOP_CENTER
  });
};

export const loginInfo = loginpayload => dispatch => {
  dispatch(loadingGifSearch());
  axios
    .post(URL.USER_LOGIN, loginpayload)
    .then(res => {
      dispatch(stopGifSearching());
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data.data));
      //sessionStorage.setItem("userLogin", JSON.stringify(res.data.data));
      if (res.status == 200) {
        dispatch({
          type: actionType.LOGIN_SUCCESS,
          payload: res.data.data
        });
        _toast({
          type: "success",
          message: "Logged in successfully",
          position: toast.POSITION.TOP_CENTER
        });
      }
      else {
        _toast({
          type: "warning",
          message: res.data.message,
          position: toast.POSITION.TOP_CENTER
        });
      }
    })
    .catch(error => {
      dispatch(stopGifSearching());
      dispatch({
        type: actionType.LOGIN_FAILURE,
        error: error.response.data
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.TOP_CENTER
      });
    });
};

const _toast = ({ type, message, position }) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: position
      });
      break;
    case "error":
      toast.error(message, {
        position: position
      });
      break;
    case "warning":
      break;
      toast.warn(message, {
        position: position
      });
    case "info":
      break;
      toast.info(message, {
        position: position
      });
    case "default":
      break;
      toast(message, {
        position: position
      });
    default:
      break;
  }
};
