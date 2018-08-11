import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/main/Main';

export const AppNavigator = createStackNavigator({
    Main: { screen: Main }
});
