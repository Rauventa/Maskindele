import {RENDER_AUTH_VALUE, RENDER_INITIAL_AUTH} from "../../actionTypes";

const initialState = {
    authValue: false
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case RENDER_AUTH_VALUE:
            return {
                ...state,
                authValue: action.authValue
            }
        case RENDER_INITIAL_AUTH:
            return {
                ...state,
                authValue: action.authValue
            }
        default:
            return state
    }
}