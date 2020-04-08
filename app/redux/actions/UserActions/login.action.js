import * as Action from '../../../utils/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from 'react-native';
import { postData } from '../../../services/index';
import * as Constants from '../../../utils/constants'

export const setLoginValues = (key, val) => {
    return (dispatch) => {
        dispatch({
            type: Action.USER_LOGIN_VALUE,
            payload: val,
            property: key
        })
    }
}

export const setLoginEmpty = () => {  
    return (dispatch) => {
        dispatch({
            type: Action.USER_LOGIN_EMPTY
        })
    }
}

export function fetchUserLogin(data) {
    Keyboard.dismiss()
    return (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(userLoginAction())
                postData(Constants.ApiMethods.login, data)
                    .then(response => {
                        if (response !== undefined) {
                            if (response.status === true) {
                                dispatch(userLoginSucess({data: response.data, message: response.message}))
                            } else {
                                dispatch(userLoginFailure(response.message))
                            }
                        } else {
                            dispatch(userLoginFailure(Constants.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(userLoginFailure(Constants.Messages.server_error))));
            } else {
                dispatch(userLoginFailure(Constants.Messages.no_internet))
            }
        });

    }
}

function userLoginAction() {
    return {
        type: Action.USER_LOGIN
    }
}

function userLoginSucess(data) {
    return {
        type: Action.USER_LOGIN_SUCCESS,
        data
    }
}

function userLoginFailure(err) {
    return {
        type: Action.USER_LOGIN_FAILURE,
        error: err
    }
}

export const setRouterValues=(key, val)=> {
    return {
        type: Action.SET_ROUTER,
        payload: val,
        property: key
    }
}