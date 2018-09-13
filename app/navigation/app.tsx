import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import Guest from "../screens/Guest";

const AppNavigator = createStackNavigator({
    Main: { screen: Main },
    Guest: { screen: Guest }
    },
    { headerMode: 'none' });

export default AppNavigator;
