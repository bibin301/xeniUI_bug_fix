import axios from "axios";
import actionType from "../addCart/actionType";
import URL from "../../asset/configUrl";

export const addItinerary = itineraryPayload => dispatch => {
  const {
    type,
    index,
    title,
    price
  } = itineraryPayload;

  dispatch({ type: actionType.ADD_ITINERARY_SUCCESS, payload: itineraryPayload });
};
export const removeItinerary = itineraryPayload => dispatch => {
  const {
    type,
    index,
    title,
    price
  } = itineraryPayload;

  dispatch({ type: actionType.REMOVE_ITINERARY_SUCCESS, payload: itineraryPayload });
};


