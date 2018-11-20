import React, {Component} from 'react';
import {View, Image, Animated} from 'react-native';
import styles from './style';

import {ParallaxSwiper, ParallaxSwiperPage} from 'react-native-parallax-swiper';

import LoginButton from '../../components/LoginButton';
import Bubble from '../../components/Bubble';
import Button from '../../components/Button';
import {NavigationScreenProps} from 'react-navigation';
import {socialTypes} from '../SignUp';
import Intro from '../../components/Intro/Intro';

const LOGIN_BACKGROUND_1 = require('./img/intro1.png');
const LOGIN_BACKGROUND_2 = require('./img/intro2.png');
const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends Component<NavigationScreenProps> {
    private onLoginPress = () => {
        this.props.navigation.navigate('Login');
    }

    private onSignUpPress = (signUpType: socialTypes) => {
        this.props.navigation.navigate('SignUp', {type: signUpType });
    }

    private renderFirstScreen = () => (
        <View style={styles.container}>
            <Bubble>
                <Intro
                    title="Hello there!"
                    text="Making Lunch unde omnis iste natus error sit volup tatem accus antium dolore mque laudantium,
                    totam rem aperiam."
                    bigTitle={true}
                />
            </Bubble>
        </View>
    )

    private renderSecondScreen = () => (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <Bubble>
                <Intro
                    title="It’s so nice to meet you!"
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                    sed quia non."
                />
            </Bubble>
        </View>
    )

    private renderFinalScreen = () => (
        <View style={styles.container}>
            <Bubble>
                <Intro
                    title="Let's get started now"
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
                />
            </Bubble>

            <LoginButton
                text={'Start with Facebook'}
                onPress={() => this.onSignUpPress(socialTypes.facebook)}
                color={'#4a90e2'}
                iconContainerColor={'#4280cb'}
                type={socialTypes.facebook}
            />

            <LoginButton
                text={'Start with Google'}
                onPress={() => this.onSignUpPress(socialTypes.google)}
                color={'#ff5c5c'}
                iconContainerColor={'#e65252'}
                type={socialTypes.google}
            />
            <LoginButton
                text={'Start with email'}
                onPress={() => this.onSignUpPress(socialTypes.mail)}
                color={'#50e3c2'}
                iconContainerColor={'#48ccae'}
                type={socialTypes.mail}
            />

            <Button text={'Log in'} onPress={this.onLoginPress} small={true}/>
        </View>
    )

    public render() {
        return (
            <ParallaxSwiper
                speed={0.5}
                animatedValue={new Animated.Value(0)}
                showProgressBar={true}
                progressBarValueBackgroundColor="white"
            >
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_1}/>}
                    ForegroundComponent={this.renderFirstScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_2}/>}
                    ForegroundComponent={this.renderSecondScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_3}/>}
                    ForegroundComponent={this.renderFinalScreen()}
                />
            </ParallaxSwiper>
        );
    }
}

export default Landing;
