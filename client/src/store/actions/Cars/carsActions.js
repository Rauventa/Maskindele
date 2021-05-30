import axios from 'axios';
import {GET_ALL_CARS_SUCCESS} from "../../actionTypes";

export function getAllCars() {
    return async dispatch => {
        try {
            const response = await axios.get('/api/car');

            dispatch(getAllCarsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getAllCarsSuccess(cars) {
    return {
        type: GET_ALL_CARS_SUCCESS,
        cars
    }
}