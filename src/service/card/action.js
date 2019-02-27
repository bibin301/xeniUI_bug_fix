import axios from "../Axios";
import actionType from "./actionType";
import { toast, Flip } from "react-toastify";
import URL from '../../asset/configUrl'
export const getCard = email => dispatch => {
  axios
    .get(URL.card.CARD_GET + email)
    .then(result => {
      console.log("result", result.data.data);
      dispatch({
        type: actionType.GET_CARD_SUCCESS,
        payload: result.data.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.GET_CARD_FAILURE,
        payload: error
      });
      _toast({
        type: "error",
        message: error,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const addCard = payload => dispatch => {
  axios
    .post(URL.card.CARD_ADD, payload)
    .then(result => {
      console.log("result", result.data);
      dispatch({
        type: actionType.ADD_CARD_SUCCESS,
        payload: result.data
      });
      dispatch(getCard(payload.email));
      _toast({
        type: "success",
        message: result.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ADD_CARD_FAILURE,
        payload: error
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const deleteCard = payload => dispatch => {
  axios
    .post(URL.card.CARD_DELETE, payload)
    .then(result => {
      console.log("result", result.data);
      dispatch({
        type: actionType.DELETE_CARD_SUCCESS,
        payload: result.data
      });
      _toast({
        type: "success",
        message: result.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.DELETE_CARD_FAILURE,
        payload: error
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

const _toast = ({ type, message, position }) => {
  switch (type) {
    case "success":
      toast.success(message, { position: position });
      break;
    case "error":
      toast.error(message, { position: position });
      break;
    case "warning":
      break;
      toast.warn(message, { position: position });
    case "info":
      break;
      toast.info(message, { position: position });
    case "default":
      break;
      toast(message, { position: position });
    default:
      break;
  }
};
