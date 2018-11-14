import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Chat from '../screens/Chat/Chat';
import LunchesList from '../screens/LunchesList/LunchesList';
import Lunch from '../screens/Lunch/Lunch';

const AppStack = createStackNavigator(
    {
        Main: {screen: Main},
        LunchesList: {screen: LunchesList},
        Lunch: {screen: Lunch},
        Profile: {screen: Profile},
        Settings: {screen: Settings},
        Chat: {screen: Chat},
    },
    {
        initialRouteName: 'Main',
    });

export default AppStack;
