import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import UserProfile from '../screens/UserProfile';
import Settings from '../screens/Settings';
import LunchesList from '../screens/LunchesList/LunchesList';


const AppStack = createStackNavigator(
    {
        Main: {screen: Main},
        LunchesList: {screen: LunchesList},
        UserProfile: {screen: UserProfile},
        Settings: {screen: Settings},
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    });

export default AppStack;
