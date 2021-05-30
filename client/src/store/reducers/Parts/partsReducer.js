import {GET_USER_PARTS_SUCCESS} from "../../actionTypes";

const initialState = {
    parts: [],
    allParts: []
};

export default function partsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PARTS_SUCCESS:
            return {
                ...state,
                parts: action.parts
            }
        default:
            return state
    }
}