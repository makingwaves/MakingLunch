import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './style';
import InfoBadge from '../../components/InfoBadge';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { NavigationScreenProps } from 'react-navigation';

const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

type LoginState = {
    username: string;
    password: string;
    failureFlag: boolean;
    isLoading: boolean;
};

class Login extends Component<NavigationScreenProps, LoginState> {
    constructor(props: NavigationScreenProps) {
        super(props);
        this.state = {
            username: 'test',
            password: '',
            failureFlag: false,
            isLoading: false
        };
    }

    onLoginPress = () => {
        if (this.state.username === 'test' && this.state.password === 'test') {
            this.props.navigation.navigate('App');
        } else {
            this.setState({ failureFlag: true });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={LOGIN_BACKGROUND_3} style={styles.backgroundImage} blurRadius={30} />

                <View style={{ flex: 0 }}>
                    <Input
                        title="Your email"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                        placeholder={'Username'}
                    />

                    <Input
                        title="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder={'Username'}
                        secureTextEntry={true}
                    />
                </View>

                {this.state.failureFlag && <InfoBadge infoText={'Error'} />}

                <Button text={'Login'} onPress={this.onLoginPress} />
            </View>
        );
    }
}

export default Login;
