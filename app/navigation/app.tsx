import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/main/Main';

const AppNavigator = createStackNavigator({
    Main: { screen: Main }
});

export default AppNavigator;
