import actionType from "../login/actionType";
const initialState = {
  loginDetails: null,
  signupDetails: null,
  loginStatus: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loginDetails: action.payload,
        loginStatus: true
      };
    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        loginDetails: action.error
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        ...state,
        loginDetails: null,
        loginStatus: false
      };
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state,
        signupDetails: action.payload
      };
      case actionType.SIGNUP_FAILURE:
      return{
          ...state,
          signupDetails:action.error
      }
    default:
      return state;
  }
};
export default loginReducer;
