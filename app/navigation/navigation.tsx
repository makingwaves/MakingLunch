import React, { Component } from 'react'
import { createAppContainer, createStackNavigator, NavigationScreenProp, NavigationParams } from 'react-navigation';

import { navigationService } from '@app/services';

import Landing from '@app/screens/Landing';
import AppStack from '@app/navigation/app';
import InitialScreen from '@app/screens/InitialScreen';
import pushNotificationService from '@app/api/pushNotificationService/pushNotificationService';

const RootNavigation = createStackNavigator(
    {
        App: {
            screen: AppStack
        },
        Auth: {
            screen: Landing
        },
        Initial: {
            screen: InitialScreen
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Initial'
    }
);

const RootNavigationContainer = createAppContainer(RootNavigation);

class Navigation extends Component {
    private navigatorRef: React.RefObject<NavigationScreenProp<NavigationParams>>;

    constructor(props) {
        super(props);

        this.navigatorRef = React.createRef();

        pushNotificationService.configureNotification();
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

