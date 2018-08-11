import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import styles from './style';
import InfoBadge from '../../components/InfoBadge/InfoBadge';
import LoginButton from '../../components/LoginButton/LoginButton';
import Bubble from '../../components/Bubble/Bubble';
import Button from '../../components/Button/Button';

const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'test',
            password: '',
            failureFlag: false,
            isLoading: false
        };

        this.loginFailureText = 'Password incorrect';
    }

    onLoginPress = () => {
        this.props.navigation.navigate('Login');
        // console.log('try to login');

        // if (this.state.username === 'test' && this.state.password === 'test') {
        //     this.props.navigation.navigate('App');
        // } else {
        //     this.setState({ failureFlag: true });
        // }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={LOGIN_BACKGROUND_3} style={styles.backgroundImage} blurRadius={30} />

                <Button text={'Login'} onPress={this.onLoginPress} />
            </View>
        );
    }
}

export default Login;
