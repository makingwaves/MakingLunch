import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';
import styles from './style';

import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';

import LoginButton from '../../components/LoginButton';
import Bubble from '../../components/Bubble';
import Button from '../../components/Button';
import { NavigationScreenProps } from 'react-navigation';
import { socialTypes } from '../../components/LoginButton/LoginButton';

const LOGIN_BACKGROUND_1 = require('./img/intro1.png');
const LOGIN_BACKGROUND_2 = require('./img/intro2.png');
const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends Component<NavigationScreenProps> {
    onLoginPress = () => {
        this.props.navigation.navigate('Login');
    };

    renderFirstScreen = () => (
        <View style={styles.container}>
            <Bubble
                title="Hello there!"
                text="Making Lunch unde omnis iste natus error sit volup tatem accus antium dolore mque laudantium, totam rem aperiam."
                bigTitle={true}
            />
        </View>
    );

    renderSecondScreen = () => (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <Bubble
                title="It’s so nice to meet you!"
                text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non."
            />
        </View>
    );

    renderFinalScreen = () => (
        <View style={styles.container}>
            <Bubble
                title="Let's get started now"
                text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
            />

            <LoginButton
                text={'Sing up with Facebook'}
                onPress={() => console.log('Sing up with Facebook')}
                color={'#4a90e2'}
                iconContainerColor={'#4280cb'}
                type={socialTypes.facebook}
            />

            <LoginButton
                text={'Sing up with Google'}
                onPress={() => console.log('Sign up with Google')}
                color={'#ff5c5c'}
                iconContainerColor={'#e65252'}
                type={socialTypes.google}
            />
            <LoginButton
                text={'Sing up with email'}
                onPress={() => console.log('Sign up with email')}
                color={'#50e3c2'}
                iconContainerColor={'#48ccae'}
                type={socialTypes.mail}
            />

            <Button text={'Log in'} onPress={this.onLoginPress} small />
        </View>
    );

    render() {
        return (
            <ParallaxSwiper
                speed={0.5}
                animatedValue={new Animated.Value(0)}
                showProgressBar={true}
                progressBarValueBackgroundColor="white"
            >
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_1} />}
                    ForegroundComponent={this.renderFirstScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_2} />}
                    ForegroundComponent={this.renderSecondScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_3} />}
                    ForegroundComponent={this.renderFinalScreen()}
                />
            </ParallaxSwiper>
        );
    }
}

export default Landing;
