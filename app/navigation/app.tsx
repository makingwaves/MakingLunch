import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import UserProfile from '../screens/UserProfile';
import LunchesList from '../screens/LunchesList';
import ChatMessages from '../screens/ChatMessages';
import GuestsSwiper from '../screens/GuestsSwiper';

const AppStack = createStackNavigator(
    {
        Main: { screen: Main },
        LunchesList: { screen: LunchesList },
        UserProfile: { screen: UserProfile },
        Chat: { screen: ChatMessages },
        GuestsSwiper: { screen: GuestsSwiper } 
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    });

export default AppStack;
