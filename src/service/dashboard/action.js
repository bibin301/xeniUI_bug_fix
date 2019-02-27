import axios from '../Axios';
import URL from '../../asset/configUrl';
import actionType from '../../service/dashboard/actionType';


import {
    loadingGifSearch,
    stopGifSearching
  } from "../common/action";


export const updateProfile = (profile) => dispatch => {
    const { personal_information, address } = profile
    axios.post(URL.PROFILE_EDIT, {
        personal_information, address
    })
        .then(res => {
            dispatch(getProfile(personal_information.email))
            dispatch({
                type: actionType.PROFILE_UPDATE_SUCCESS,
                payload: res.data
            })
        }).catch(error => {
            dispatch({
                type: actionType.PROFILE_UPDATE_FAILURE,
                error: error
            })
        })

}
export const getProfile = (email) => dispatch => {
    axios
        .get(URL.GET_PROFILE + email)
        .then(res => {
            dispatch({
                type: actionType.GET_PROFILE_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: actionType.GET_PROFILE_FAILURE,
                error: error
            })

        })

}
export const changePassword = (data) => dispatch => {
    axios
        .post(URL.CHANGE_PASSWORD, data)
        .then(res => {
            dispatch({
                type: actionType.CHANGE_PASSWORD_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: actionType.CHANGE_PASSWORD_FAILURE,
                error: error
            })
        })
}
export const tripDeatiledList = (data) => dispatch => {
    axios
        .post(URL.TRIP_DETAILS, data)
        // .post('http://192.168.2.105:8080/api/user/getUserTransactions', data) // remove this it's for test purpose
        .then(res => {
            dispatch({
                type: actionType.TRIP_SUCCES,
                payload: res.data.transactionlist
            })
        })
        .catch(error => {
            dispatch({
                type: actionType.TRIP_FAILURE,
                error: error
            })
        })
}
export const recentActivityList = (data) => dispatch => {
    console.log('data', data)
    dispatch(loadingGifSearch());
    axios
        // .get(URL.RECENT_ACTIVITY CHANGE URL)
        // .get('http://192.168.2.105:8080/api/user/getRecentActivity?email=' + data.email, {
        .get(URL.RECENT_ACTIVITY + data.email, {
            'headers': {
                'secret-code': 'xeni-app-development'
            }
        })
        .then(res => {
            console.log('result', res)
            dispatch(stopGifSearching())
            dispatch({
                type: actionType.RECENT_ACTIVITY_SUCCESS,
                payload: res.data.transactionlist
            })
            
        })
        .catch(error => {
            dispatch(stopGifSearching())
            dispatch({
                type: actionType.RECENT_ACTIVITY_FAILURE,
                error: error
            })
        
        })
}
export const profileImageChange = (data) => dispatch => {
    console.log('data', data)
    axios
        // .post('http://192.168.2.105:8080/api/user/getRecentActivity?email=' + data.email, {
        .post(URL.RECENT_ACTIVITY + data.email, {
            'headers': {
                'secret-code': 'xeni-app-development'
            }
        })
        .then(res => {
            console.log('result', res)
            dispatch({
                type: actionType.PROFILE_IMAGE_SUCCESS,
                payload: res.data.transactionlist
            })
        })
        .catch(error => {
            dispatch({
                type: actionType.PROFILE_IMAGE_FAILURE,
                error: error
            })
        })
}

export const getRefundAmount = (data) => dispatch => {
    dispatch(loadingGifSearch());
    axios.post(URL.GET_REFUND_AMOUNT, data,{
            'headers': {
                'secret-code': 'xeni-app-development'
            }
        })
        .then(res => {
            console.log('result', res)
            dispatch(stopGifSearching());
            dispatch({
                type: actionType.REFUND_SUCCESS,
                payload: res.data
            })
            
        })
        .catch(error => {
            dispatch(stopGifSearching());
            dispatch({
                type: actionType.REFUND_FAILURE,
                error: error
            })
           
        })
}

export const getCancelInfo = (data) => dispatch =>{
    dispatch({
        type: actionType.CANCEL_ROUTE_INFO,
        payload: data

      })

}


export const cancelledBooking = (data) => dispatch => {

    dispatch(loadingGifSearch());

    axios.post(URL.CANCELLED_BOOKING ,data,{
        'headers': {
            'secret-code': 'xeni-app-development'
        }

    }).then(res =>{
        dispatch({
            type: actionType.CANCELLED_SUCCESS,
            payload: res.data
        })
       
        dispatch(stopGifSearching());
      
    })
    .catch(error =>{
        dispatch({
            type: actionType.CANCELLED_FAILURE,
            error: error
        })
        dispatch(stopGifSearching());
    })
}
