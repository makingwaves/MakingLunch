import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import UserProfile from '../screens/UserProfile';
import LunchesList from '../screens/LunchesList';
import ChatMessages from '../screens/ChatMessages';


const AppStack = createStackNavigator(
    {
        Main: { screen: Main },
        LunchesList: { screen: LunchesList },
        UserProfile: { screen: UserProfile },
        Chat: { screen: ChatMessages }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    });

export default AppStack;
