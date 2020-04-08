import * as ActionType from '../../../utils/actionTypes';

const initialState = {
    showChangePasswordModal:false,
    password: '',
    confirm_password: '',
    old_password:'',
    isPasswordUpdated:false,
    isLoading: false,
    message:'',
    changeResponse: {},
    error: false,
    errorMsg: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CHANGE_PASSWORD_VALUE:           
            return { ...state, [action.property]: action.payload, changeResponse: {}, error: false, errorMsg: ''}; 
        case ActionType.CHANGE_PASSWORD_EMPTY:
            return  initialState                       
        case ActionType.CHANGE_PASSWORD:
            return {
                ...state, isLoading: true, changeResponse: {}, error: false, errorMsg: ''
            }
        case ActionType.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state, isLoading: false,isPasswordUpdated:true, changeResponse: action.data, errorMsg: '', error: false,message:action.data.message

            }
        case ActionType.CHANGE_PASSWORD_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.error
            }
        default:
            return state
    }
}
