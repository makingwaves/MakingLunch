import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import UserProfile from '../screens/UserProfile';
import Settings from '../screens/Settings';
import LunchesList from '../screens/LunchesList/LunchesList';
import Chat from '../screens/Chat';


const AppStack = createStackNavigator(
    {
        Main: { screen: Main },
        LunchesList: { screen: LunchesList },
        UserProfile: { screen: UserProfile },
        Settings: { screen: Settings },
        Chat: { screen: Chat }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    });

export default AppStack;
