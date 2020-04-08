import * as ActionType from '../../../utils/actionTypes';

const initialState = {
    isLogedIn:false,
    forgotEmail:'',
    isLoading: false,
    forgotResponse: {},
    error: false,
    errorMsg: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ActionType.USER_FORGOT_EMAIL:
            return { ...state, forgotEmail: action.payload, forgotResponse: {}, error: false, errorMsg: '' }
        case ActionType.USER_FORGOT:
            return {
                ...state, isLoading: true, forgotResponse: {}, error: false, errorMsg: ''
            }
        case ActionType.USER_FORGOT_SUCCESS:
            return {
                ...state, isLoading: false, forgotResponse: action.data, errorMsg: '', error: false,
            }
        case ActionType.USER_FORGOT_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.error
            }
        case ActionType.SET_FORGOT_EMPTY:
                return initialState
        default:
            return state
    }
}

