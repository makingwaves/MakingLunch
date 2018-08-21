import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from '../screens/Login2';
import Landing from '../screens/Landing2';
import AppNavigator from './app';

const AuthStack = createStackNavigator(
    {
        Landing: { screen: Landing },
        Login: { screen: Login }
    },
    { headerMode: 'none' }
);

export default createSwitchNavigator(
    {
        App: AppNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth'
    }
);
