import axios from 'axios';
import {GET_CUSTOMER_PARTS_SUCCESS, GET_USER_PARTS_SUCCESS} from "../../actionTypes";

export function getUserParts(userId) {
    return async dispatch => {
        try {
            const response = await axios.post('/api/user/parts', {userId});
            dispatch(getUserPartsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getCustomerParts(userId) {
    return async dispatch => {
        try {
            const response = await axios.post('/api/user/customer', {userId});
            dispatch(getCustomerPartsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getUserPartsSuccess(parts) {
    return {
        type: GET_USER_PARTS_SUCCESS,
        parts
    }
}

export function getCustomerPartsSuccess(customerParts) {
    return {
        type: GET_CUSTOMER_PARTS_SUCCESS,
        customerParts
    }
}