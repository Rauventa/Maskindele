import axios from 'axios';
import {GET_USER_PARTS_SUCCESS} from "../../actionTypes";

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

export function getUserPartsSuccess(parts) {
    return {
        type: GET_USER_PARTS_SUCCESS,
        parts
    }
}