import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './style';
import Swiper from 'react-native-swiper';
import LoginButton from '../../components/LoginButton/LoginButton';
import Bubble from '../../components/Bubble/Bubble';
import Button from '../../components/Button/Button';

const LOGIN_BACKGROUND_1 = require('./img/intro1.png');
const LOGIN_BACKGROUND_2 = require('./img/intro2.png');
const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends Component {
    onLoginPress = () => {
        this.props.navigation.navigate('Login');
    };

    renderFirstScreen = () => (
        <View style={styles.container}>
            <Image source={LOGIN_BACKGROUND_1} style={styles.backgroundImage} />
            <Bubble
                title="Hello there!"
                text="Making Lunch unde omnis iste natus error sit volup tatem accus antium dolore mque laudantium, totam rem aperiam."
                bigTitle={true}
            />
        </View>
    );

    renderSecondScreen = () => (
        <View style={styles.container}>
            <Image source={LOGIN_BACKGROUND_2} style={styles.backgroundImage} />
            <View style={{ flex: 1 }} />
            <Bubble
                title="It’s so nice to meet you!"
                text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non."
            />
        </View>
    );

    renderFinalScreen = () => (
        <View style={styles.container}>
            <Image source={LOGIN_BACKGROUND_3} style={styles.backgroundImage} />
            <Bubble
                title="Let's get started now"
                text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
            />

            <LoginButton
                text={'Sing up with Facebook'}
                onPress={() => console.log('Sing up with Facebook')}
                color={'#4a90e2'}
                iconContainerColor={'#4280cb'}
                type={'Facebook'}
            />

            <LoginButton
                text={'Sing up with Google'}
                onPress={() => console.log('Sign up with Google')}
                color={'#ff5c5c'}
                iconContainerColor={'#e65252'}
                type={'Google'}
            />
            <LoginButton
                text={'Sing up with email'}
                onPress={() => console.log('Sign up with email')}
                color={'#50e3c2'}
                iconContainerColor={'#48ccae'}
                type={'Mail'}
            />

            <Button text={'Log in'} onPress={this.onLoginPress} small />
        </View>
    );

    render() {
        return (
            <Swiper loop={false}>
                {this.renderFirstScreen()}
                {this.renderSecondScreen()}
                {this.renderFinalScreen()}
            </Swiper>
        );
    }
}

export default Landing;
