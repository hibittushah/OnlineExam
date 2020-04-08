import * as Action from '../../../utils/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from 'react-native';
import { postData } from '../../../services/index';
import * as Constants from '../../../utils/constants'

export const setChangePasswordValues = (key, val) => {
    return (dispatch) => {
        dispatch({
            type:Action.CHANGE_PASSWORD_VALUE, 
            payload: val,
            property: key
        })
    }
} 
export const setChangePasswordEmpty = () => {
    return (dispatch) => {
        dispatch({
            type: Action.CHANGE_PASSWORD_EMPTY,           
        })
    }
}


export function fetchChangePasswordApi(data) {
    Keyboard.dismiss()
    return (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(fectchChangePasswordAction())
                postData(Constants.ApiMethods.changePassword, data)
                    .then(response => {
                        if (response !== undefined) {
                            if (response.status === true) {                               
                               dispatch(fectchChangePasswordSucess({data:response.data, message: response.message}))                         
                            } else {
                                dispatch(fectchChangePasswordFailure(response.message))
                            }
                        } else {
                            dispatch(fectchChangePasswordFailure(Constant.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(fectchChangePasswordFailure(Constant.Messages.server_error))));
            } else {
                dispatch(fectchChangePasswordFailure(Constant.Messages.no_internet))
            }
        });

    }
}

function fectchChangePasswordAction() {
    return {
        type: Action.CHANGE_PASSWORD
    }
}

function fectchChangePasswordSucess(data) {
    return {
        type: Action.CHANGE_PASSWORD_SUCCESS,
        data
    }
}

function fectchChangePasswordFailure(err) {
    return {
        type: Action.CHANGE_PASSWORD_FAILURE,
        error: err
    }
}