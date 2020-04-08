import * as ActionType from '../../../utils/actionTypes';

const initialState = {
    email: '',
    name: '',    
    profile_pic: '',
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case ActionType.SIDE_MENU_VALUE:
            return { ...state, [action.property]: action.payload };
        default:
            return state
    }
}




