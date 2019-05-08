import { createStackNavigator } from 'react-navigation';

import Main from '@app/screens/Main';
import LunchesList from '@app/screens/LunchesList';
import UserProfile from '@app/screens/UserProfile';
import ChatMessages from '@app/screens/ChatMessages';
import GuestsSwiper from '@app/screens/GuestsSwiper';

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
