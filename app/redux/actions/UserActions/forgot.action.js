import * as Action from '../../../utils/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from 'react-native';
import { postData } from '../../../services/index';
import * as Constants from '../../../utils/constants'


export const setForgotPasswordValue = (email) => {
    return (dispatch) => {
        dispatch({
            type: Action.USER_FORGOT_EMAIL,
            payload: email
        })
    }
}

export const setForgotPasswordEmpty = () => {
    return (dispatch) => {
        dispatch({
            type: Action.SET_FORGOT_EMPTY,           
        })
    }
}

export function fetchForgotPassword(data) {
    Keyboard.dismiss()
    return (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(userForgotPasswordAction())
                postData(Constants.ApiMethods.forgot, data)
                    .then(response => {
                        if (response !== undefined) {                            
                            if (response.status === true) {                                                            
                               dispatch(userForgotSucess( {forgotStatus: response.status, message: response.message}))                              
                            } else {
                                dispatch(userForogtFailure(response.message))
                            }
                        } else {
                            dispatch(userForogtFailure(Constant.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(userForogtFailure(Constant.Messages.server_error))));
            } else {
                dispatch(userForogtFailure(Constant.Messages.no_internet))
            }
        });

    }
}

function userForgotPasswordAction() {
    return {
        type: Action.USER_FORGOT
    }
}

function userForgotSucess(data) {
    return {
        type: Action.USER_FORGOT_SUCCESS,
        data
    }
}

function userForogtFailure(err) {
    return {
        type: Action.USER_FORGOT_FAILURE,
        error: err
    }
}
