import actionType from './actionType';

const initialState = {
    carFilterResult: null,
    carSearchResult: null,
    carPrice: null,
    carBookingResult: null

}
const carReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CAR_FILTER_SUCCESS:
            return ({
                ...state,
                carFilterResult: action.payload
            })
        case actionType.CAR_FILTER_FAILURE:
            return ({
                ...state,
                carFilterResult: {},
                errors: action.errors
            })
        case actionType.CAR_SEARCH_SUCCESS:
            return ({
                ...state,
                carSearchResult: action.payload

            })
        case actionType.CAR_SEARCH_FAILURE:
            return ({
                ...state,
                carSearchResult: {}
            })
        case actionType.CAR_GET_PRICE_SUCCESS:
            return ({
                ...state,
                carPrice: action.payload
            })
        case actionType.CAR_GET_PRICE_FAILURE:
            return ({
                ...state,
                carPrice: {}
            })
        case actionType.CAR_BOOKING_SUCCESS:
            return ({
                ...state,
                carBookingResult: action.payload
            })
        case actionType.CAR_BOOKING_FAILURE:
            return ({
                ...state,
                carBookingResult: {}
            })
        default:
            return state
    }

}
export default carReducer;