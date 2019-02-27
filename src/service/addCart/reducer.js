import { filter as _filter } from 'lodash';
import actionType from "../addCart/actionType";
import { stat } from 'fs';
const initialState = {
  addDetails: null,
  getCartDetails: null,
  editDetails: null,
  itineraryList: [],
  deleteDetails: null
};

const addcartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraryList: [...state.itineraryList, action.payload]
      };
    case actionType.REMOVE_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraryList: _filter(state.itineraryList, item => item !==action.payload)
      };
    default:
      return state;
  }
};
export default addcartReducer;
