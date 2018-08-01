import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/main/Main';

export default createStackNavigator({
    Main: { screen: Main }
});
