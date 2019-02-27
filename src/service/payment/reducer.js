import actionType from "./actionType";
const InitialState = {
   paymentDetails:null,
   bookingConfirm: null
}
const paymentReducer = (state = InitialState, action) => {
    switch (action.type) {
        case  actionType.PAYMENT_SUCCESS:
        console.log('suc red', action)
         return{
             ...state,
             paymentDetails:action.payload,
             bookingConfirm: 'success'
         }
         case 'bookingReset': 
            return {
                ...state,
                bookingConfirm: null
            }
          case  actionType.PAYMENT_FAILURE:
          console.log('fail red', action)
         return{
             ...state,
             paymentDetails:{status: 'failure'},
             bookingConfirm: 'failure'
         }
         case actionType.PAYMENTWITHCARD_SUCCESS:
         return {
             ...state,
             paymentDetails:action.payload,
         }
         case actionType.PAYMENTWITHCARD_FAILURE:
         return {
             ...state,
             paymentDetails:action.error
         }
        default:
           return state;
    }
}
export default paymentReducer