import * as Action from '../../../utils/actionTypes';

export const setSideMenuValues = (key, val) => {
    return (dispatch) => {
        dispatch({
            type: Action.SIDE_MENU_VALUE,
            payload: val,
            property: key
        })
    }
}









