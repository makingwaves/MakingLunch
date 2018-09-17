import {createStackNavigator} from 'react-navigation';
import Landing from '../screens/Landing/Landing';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';

const AuthStack = createStackNavigator(
    {
        Landing: {screen: Landing},
        Login: {screen: Login},
        SignUp: {screen: SignUp},
    },
    {
        initialRouteName: 'Landing',
        headerMode: 'none',
    },
);

export default AuthStack;
