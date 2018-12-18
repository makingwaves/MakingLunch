import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import LunchesList from '../screens/LunchesList/LunchesList';


const AppStack = createStackNavigator(
    {
        Main: {screen: Main},
        LunchesList: {screen: LunchesList},
        Profile: {screen: Profile},
        Settings: {screen: Settings},
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    });

export default AppStack;
