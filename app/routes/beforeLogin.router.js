import Introduction from '../components/Introduction/Introduction.component';
import Login from '../components/LoginModule/login.component';
import Register from '../components/LoginModule/register.component';
import ForgotPassword from '../components/LoginModule/forgotPassword.component';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
    {
        Introduction: {
            screen: Introduction,
            navigationOptions: {
                header: null
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: "Login"
            }
        },
        Register: {
            screen: Register,
        },
        ForgotPassword: {
            screen: ForgotPassword,
        }
    },
    {
        initialRouteName: 'Introduction',
        headerLayoutPreset: 'center'
    },
   

);
const Router = createAppContainer(AppNavigator);
export default Router;
