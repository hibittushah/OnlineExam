import { combineReducers } from 'redux';
import loginReducer from './UserReducers/login.reducer';
import registerReducer from './UserReducers/register.reducer';
import forgotReducer from './UserReducers/Forgot.reducer';
import routerReducer from './UserReducers/router.reducer';
import sideMenuReducer from './DashboardReducers/SideMenu.reducer';
import ProfileReducer from './UserReducers/userProfile.reducer';
import changePasswordReducer from './UserReducers/ChangePassword.reducer';
export default combineReducers({
    login: loginReducer,
    register:registerReducer,
    forgotPassword:forgotReducer,
    sideMenu:sideMenuReducer,
    router:routerReducer,
    userProfile:ProfileReducer,
    changePassword:changePasswordReducer
});