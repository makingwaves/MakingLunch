import React, { Component } from 'react'
import { createAppContainer, createStackNavigator, NavigationScreenProp, NavigationParams } from 'react-navigation';

import Landing from '../screens/Landing';
import AppStack from './app';
 
import { navigationService } from '../services';

const RootNavigation  = createStackNavigator(
    {
        App: {
            screen: AppStack
        },
        Auth: {
            screen: Landing
        }
    },
    { 
        headerMode: 'none',
        initialRouteName: 'Auth'
    }
);

const RootNavigationContainer = createAppContainer(RootNavigation);

class Navigation extends Component {
    private navigatorRef: React.RefObject<NavigationScreenProp<NavigationParams>>;

    constructor(props) {
        super(props);

        this.navigatorRef = React.createRef();
    }

    public componentDidMount(): void {
        navigationService.setNavigation(this.navigatorRef.current);
    }

    public render(): JSX.Element {
        return (
            <RootNavigationContainer ref={this.navigatorRef} />
        );
    }
}

export default Navigation;

