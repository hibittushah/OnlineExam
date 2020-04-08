import * as Login_Action_Type from '../../../utils/actionTypes';

const initialState = {
    isUserLogin:false,
    showForgotPassword: false,
    email: '',
    password: '',
    device_id: '',
    device_type: '',
    isLoading: false,
    hide: true,
    user: {},
    error: false,
    errorMsg: '',
    message:''
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Login_Action_Type.USER_LOGIN_VALUE:
            return { ...state, [action.property]: action.payload, user: {}, error: false, errorMsg: '' };
        case Login_Action_Type.USER_LOGIN_EMPTY:
            return initialState
        case Login_Action_Type.USER_LOGIN:
            return {
                ...state, isLoading: true, user: {}, error: false, errorMsg: ''
            }
        case Login_Action_Type.USER_LOGIN_SUCCESS:
            return {
                ...state, isLoading: false, isLoggedIn: true, user: action.data.data, errorMsg: '', error: false,message:action.data.message
            }
        case Login_Action_Type.USER_LOGIN_FAILURE:
            return {
                ...state, isLoading: false, isLoggedIn: false, error: true, errorMsg: action.error
            }
        default:
            return state
    }
}

