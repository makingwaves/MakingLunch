import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './style';
import LoginButton from '../../components/LoginButton/LoginButton';
import Bubble from '../../components/Bubble/Bubble';
import Button from '../../components/Button/Button';

const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends Component {
    onLoginPress = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
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
    }
}

export default Landing;
