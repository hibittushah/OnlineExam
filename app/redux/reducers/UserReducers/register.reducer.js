import * as ActionType from '../../../utils/actionTypes';
import * as  Constant from '../../../utils/constants'

const initialState = {
    fullName: '',   
    email: '',
    address:'',
    password: '',
    confirm_password: '',
    mobile:'',
    city:'',
    state:'',
    country:'',
    zipcode:'',
    isLoading: false,
    registerResponse: {},
    error: false,
    errorMsg: '',
    
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case ActionType.USER_REGISTER_VALUE:
            return { ...state, [action.property]: action.payload, registerResponse: {}, error: false, errorMsg: ''};
        case ActionType.USER_REGISTER_EMPTY:
            return initialState    
        case ActionType.USER_REGISTER:
            return { ...state, isLoading: true, registerResponse: {}, error: false, errorMsg: '' }
        case ActionType.USER_REGISTER_SUCCESS:
            return { ...state, isLoading: false, registerResponse: action.data.data, errorMsg: '', error: false,message:action.data.message }
        case ActionType.USER_REGISTER_FAILURE:
            return { ...state, isLoading: false, error: true, errorMsg: action.error }
        default:
            return state
    }
}

