import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import styles from './style';
import InfoBadge from '../../components/InfoBadge/InfoBadge';
import LoginButton from '../../components/LoginButton/LoginButton';
import Bubble from '../../components/Bubble/Bubble';

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
        console.log('try to login');

        if (this.state.username === 'test' && this.state.password === 'test') {
            this.props.navigation.navigate('App');
        } else {
            this.setState({ failureFlag: true });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.title}>Making Lunch</Text>
                <View style={styles.logo} /> */}
                {/* <View style={styles.loginContainer}> */}

                <Image source={LOGIN_BACKGROUND_3} style={styles.backgroundImage} />

                <Bubble />

                <View style={styles.socialLoginContainer}>
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
                </View>

                {/* <TextInput
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                        placeholder={'Username'}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    {this.state.failureFlag && <InfoBadge infoText={'lalala'} />} */}

                <Button title={'Login'} style={styles.input} onPress={this.onLoginPress} />
                {/* </View> */}
            </View>
        );
    }
}

export default Login;
