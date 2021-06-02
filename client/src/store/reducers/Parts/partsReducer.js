import {GET_CUSTOMER_PARTS_SUCCESS, GET_USER_PARTS_SUCCESS} from "../../actionTypes";

const initialState = {
    parts: [],
    customerParts: [],
    allParts: []
};

export default function partsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PARTS_SUCCESS:
            return {
                ...state,
                parts: action.parts
            }
        case GET_CUSTOMER_PARTS_SUCCESS:
            return {
                ...state,
                customerParts: action.customerParts
            }
        default:
            return state
    }
}