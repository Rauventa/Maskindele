import axios from 'axios';
import {GET_ALL_PARTS_SUCCESS} from "../../actionTypes";

export function getAllParts(userId) {
    return async dispatch => {

        try {
            const response = await axios.post('/api/user/parts', {userId});
            dispatch(getAllPartsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getAllPartsSuccess(parts) {
    return {
        type: GET_ALL_PARTS_SUCCESS,
        parts
    }
}