import {GET_ALL_CARS_SUCCESS} from "../../actionTypes";

const initialState = {
    cars: []
};

export default function carsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CARS_SUCCESS:
            return {
                ...state,
                cars: action.cars
            }
        default:
            return state
    }
}