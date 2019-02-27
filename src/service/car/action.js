import axios from 'axios';
import URL from '../../asset/configUrl';
import actionType from '../car/actionType';

export const carSearch = (data) => dispatch => {
    const { currency, criteria } = data;
    axios.post(URL.CAR_SEARCH,
        {
            currency,
            criteria
        })
        .then(res => {
            dispatch({
                type: actionType.CAR_SEARCH_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actionTyp.CAR_SEARCH_FAILURE,
                error: err

            })

        })


}
export const carFilter = (sessionId) => dispatch => {
    axios.post(URL.CAR_FILTER, { sessionId })
        .then(res => {
            dispatch({
                type: actionType.CAR_FILTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actionType.CAR_FILTER_FAILURE,
                error: err
            });
        })

}

export const carPrice = (data) => dispatch => {
    const { sessionId, rentalId, currency } = data;
    axios.post(URL.CAR_PRICE, {
        sessionId,
        rentalId,
        currency
    })
        .then(res => {
            dispatch({
                type: actionType.CAR_GET_PRICE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actionType.CAR_GET_PRICE_FAILURE,
                error: err
            })
        })

}
export const carBooking = (data) => dispatch => {
    const { sessionId,rentalId,paymentBreakup,paymentMethod,customer,driverInfo} = data;
    axios.post(URL.CAR_BOOKING, {
        sessionId,
        rentalId,
        paymentBreakup,
        paymentMethod,
        customer,
        driverInfo
    })
        .then(res => {
            dispatch({
                type: actionType.CAR_BOOKING_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actionType.CAR_BOOKING_FAILURE
            })
        })

}