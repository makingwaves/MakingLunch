import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AppStack from './app';
import AuthStack from './auth';

const RootNavigation = createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    },
);

export default RootNavigation;
