import { Keyboard } from 'react-native';
import * as ActionType from '../../../utils/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import * as Constant from '../../../utils/constants';
import { postDataWithImage,postData } from '../../../services/index';

export const setProfileValues = (key, val) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.USER_PROFILE_VALUE,
            payload: val,
            property: key
        })
    }
}

export const setProfileEmpty = () => {

    return (dispatch) => {
        dispatch({
            type: ActionType.USER_PROFILE_EMPTY
        })
    }
}

export function updateUserProfile(data) {
    Keyboard.dismiss()
    return (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(userProfileAction())
                postData(Constant.ApiMethods.userProfile, data)
                    .then(response => {
                        if (response !== undefined) {
                            if (response.status === true) {
                                dispatch(userProfileSucess({data:response.data, message: response.message}))
                            } else {
                                dispatch(userProfileFailure(response.message))
                            }
                        } else {
                            dispatch(userProfileFailure(Constant.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(userProfileFailure(Constant.Messages.server_error))));
            } else {
                dispatch(userProfileFailure(Constant.Messages.no_internet))
            }
        });

    }
}

function userProfileAction() {
    return {
        type: ActionType.USER_PROFILE
    }
}

function userProfileSucess(data) {
    return {
        type: ActionType.USER_PROFILE_SUCCESS,
        data
    }
}

function userProfileFailure(err) {
    return {
        type: ActionType.USER_PROFILE_FAILURE,
        error: err
    }
}
