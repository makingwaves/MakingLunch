import * as React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';


}

const AppStack = createStackNavigator({
    Main: {
        screen: Main
    }
});
const AuthStack = createStackNavigator({
    Login: { screen:  Login },
    Registration: { screen: Registration }
});

export default createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
    Loading: LoadingScreen
}, {
    initialRouteName: 'Loading'
});
