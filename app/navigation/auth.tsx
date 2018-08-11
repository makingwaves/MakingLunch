import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/login/Login';
import Intro1 from '../screens/login/Intro';
import Intro2 from '../screens/login/Intro2';
import { Easing, Animated } from '../../node_modules/@types/react-native';

export const AuthNavigator = createStackNavigator(
    {
        Intro1: { screen: Intro1 },
        Intro2: { screen: Intro2 },
        Login: { screen: Login }
        // Registration: { screen: Registration }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: true
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0]
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1]
                });

                return { opacity, transform: [{ translateY }] };
            }
        })
    }
);
