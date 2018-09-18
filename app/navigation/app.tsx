import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import GuestsList from "../screens/GuestsList";

const AppNavigator = createStackNavigator({
    Main: { screen: Main },
    Guests: { screen: GuestsList }
    },
    { headerMode: 'none' });

export default AppNavigator;
