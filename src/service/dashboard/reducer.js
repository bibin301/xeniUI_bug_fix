import actionType from "../dashboard/actionType"

const initialState = {
    profileSuccessInfo: null,
    profileData: null,
    myTripList: [],
    recentList: [],
    refundList: [],
    cancelRouteInfo:[],
    cancelledBookingInfo:[],
    cancelledConfirm: false
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PROFILE_UPDATE_SUCCESS:

            return ({
                ...state,
                profileSuccessInfo: action.payload
            })
        case actionType.PROFILE_UPDATE_FAILURE:

            return {
                ...state,
                errors: action.errors.response
            }
        case actionType.GET_PROFILE_SUCCESS:
            console.log("action.payload", action.payload);
           return ({
                ...state,
                profileData: action.payload
            })
        case actionType.GET_PROFILE_FAILURE:
            return ({
                ...state,
                errors: action.errors
            })
        case actionType.CHANGE_PASSWORD_SUCCESS:
            return ({
                ...state,
            })
        case actionType.CHANGE_PASSWORD_FAILURE:
            return ({
                errors: action.errors
            })
        case actionType.TRIP_SUCCES:
            return ({
                ...state,
                myTripList: action.payload
            })
        case actionType.TRIP_FAILURE:
            return ({
                errors: action.errors
            })
        case actionType.RECENT_ACTIVITY_SUCCESS:
            return ({
                ...state,
                recentList: action.payload
            })
        case actionType.RECENT_ACTIVITY_FAILURE:
            return ({
                errors: action.errors
            })
        case actionType.REFUND_SUCCESS:
        return({
            ...state,
            refundList: action.payload
        })
        case actionType.REFUND_FAILURE:
        return({
            errors: action.errors
        })
        case actionType.CANCEL_ROUTE_INFO:
        return({
            ...state,
            cancelRouteInfo:action.payload

        })
        case actionType.CANCELLED_SUCCESS:
        return({
            ...state,
            cancelledBookingInfo:action.payload,
            cancelledConfirm: true

        })
        case actionType.CANCELLED_FAILURE:
        return({
            errors: action.errors
        })
        default:
        return state;
    }

}
export default dashboardReducer;