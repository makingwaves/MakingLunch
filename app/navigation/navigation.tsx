import * as React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from '../screens/login/Login';
import Landing from '../screens/landing/Landing';
import { AppNavigator } from './app';

// const AppStack = createStackNavigator({
// Main: {
// screen: Main
// }
// });
const AuthStack = createStackNavigator(
    {
        Landing: { screen: Landing },
        Login: { screen: Login }
        // Registration: { screen: Registration }
    },
    { headerMode: 'none' }
);

export default createSwitchNavigator(
    {
        App: AppNavigator,
        Auth: AuthStack
        // Loading: LoadingScreen
    },
    {
        initialRouteName: 'Auth'
    }
);

// import * as React from 'react';
// import { createSwitchNavigator } from 'react-navigation';
// import { AuthNavigator } from './auth';
// import { AppNavigator } from './app';

// export default createSwitchNavigator(
//     {
//         App: AppNavigator,
//         Auth: AuthNavigator
//         // Loading: LoadingScreen
//     },
//     {
//         initialRouteName: 'Auth'
//     }
// );
