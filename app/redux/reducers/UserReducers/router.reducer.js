import * as ActionType from '../../../utils/actionTypes';
const initialState = {
    isUserLogin: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_ROUTER:
            return {
                ...state, [action.property]: action.payload,
            }
        default: return state
    }
}