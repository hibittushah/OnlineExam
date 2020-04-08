import * as ActionType from '../../../utils/actionTypes';

const initialState = {
    email: '',
    name: '',
    phone: '',
    profile_pic: '',
    message:'',
    isProfileUpdated: false,  
    profileResponse: {},
    error: false,
    isLoading: false,
    errorMsg: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ActionType.USER_PROFILE_VALUE:
            return { ...state, [action.property]: action.payload, profileResponse: {}, error: false, errorMsg: '' }
        case ActionType.USER_PROFILE_EMPTY:
            return initialState
        case ActionType.USER_PROFILE:
            return {
                ...state, isLoading: true, profileResponse: {}, error: false, errorMsg: ''
            }
        case ActionType.USER_PROFILE_SUCCESS:
            return {
                ...state, isLoading: false, isProfileUpdated: true, profileResponse: action.data.data, errorMsg:'', error: false,message:action.data.message
            }
        case ActionType.USER_PROFILE_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.error
            }

        default:
            return state
    }
}

