import {GET_ALL_PARTS_SUCCESS} from "../../actionTypes";

const initialState = {
    parts: []
};

export default function partsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PARTS_SUCCESS:
            return {
                ...state,
                parts: action.parts
            }
        default:
            return state
    }
}