import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import GuestsSlider from "../screens/GuestsSlider";

const AppNavigator = createStackNavigator({
    Main: { screen: Main },
    Guests: { screen: GuestsSlider }
    },
    { headerMode: 'none' });

export default AppNavigator;
