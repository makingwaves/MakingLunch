import * as React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthStack from './app/navigation/auth';
import AppStack from './app/navigation/app';
import InitScreen from './app/screens/init/InitScreen';

export default createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        Init: InitScreen
    },
    {
        initialRouteName: 'Init'
    }
);
