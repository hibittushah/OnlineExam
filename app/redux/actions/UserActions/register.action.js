import { Keyboard,Alert,alert } from 'react-native';
import * as ActionType from '../../../utils/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import * as Constants from '../../../utils/constants';
import { postData } from '../../../services/index';

export const setRegisterValues = (key, val) => {
    return (dispatch) => {
        dispatch({
            type:ActionType.USER_REGISTER_VALUE, 
            payload: val,
            property: key
        })
    }
} 
export const setRegisterEmpty = () => {
    return (dispatch) => {
        dispatch({
            type: ActionType.USER_REGISTER_EMPTY,           
        })
    }
}
export function registerUser(data) {
    
    Keyboard.dismiss()
    return (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(userRegisterAction())
                postData(Constants.ApiMethods.register, data)
                    .then(response => {
                        if (response !== undefined) {
                            if (response.status === true) {
                                dispatch(userRegisterSucess({data: response.data, message: response.message}))
                            } else {
                                dispatch(userRegisterFailure(response.message))
                            }
                        } else {
                            dispatch(userRegisterFailure(Constants.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(userRegisterFailure(Constants.Messages.server_error))));
            } else {
                dispatch(userRegisterFailure(Constants.Messages.no_internet))
            }
        });

    }
}

function userRegisterAction() {
    return {
        type: ActionType.USER_REGISTER
    }
}

function userRegisterSucess(data) {
    return {
        type: ActionType.USER_REGISTER_SUCCESS,
        data
    }
}

function userRegisterFailure(err) {
    return {
        type: ActionType.USER_REGISTER_FAILURE,
        error: err
    }
}


