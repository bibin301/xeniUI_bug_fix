import actionTypes from './actionType';

const initialState = {

  isSearching: false,
  isGifSearching: false,
  countryCode:null,
  selectedCountryCode: null,
 
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: true
      });
    case actionTypes.DISABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: false
      });
    case actionTypes.ENABLE_LOADING_GIF_SEARCH:
      return({
        ...state,
        isGifSearching: true
      });
    case actionTypes.DISABLE_LOADING_GIF_SEARCH:
      return({
        ...state,
        isGifSearching: false
      });
       case actionTypes.COUNTRYCODE_SUCCESS:
      return({
        ...state,
        countryCode: action.payload
      });
       case actionTypes.COUNTRYCODE_FAILURE:
      return({
        ...state,
        countryCode: action.error
      });
       case actionTypes.SELECTED_COUNTRYCODE_SUCCESS:
      return({
        ...state,
        selectedCountryCode: action.payload
      });
    
    default: 
      return state;
  }
}
export default reducer;