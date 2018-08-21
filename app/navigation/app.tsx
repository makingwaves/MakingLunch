import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main2';

const AppNavigator = createStackNavigator({
    Main: { screen: Main }
});

export default AppNavigator;
