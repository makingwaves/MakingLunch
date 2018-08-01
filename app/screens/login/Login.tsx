import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from './style';
import InfoBadge from '../../components/InfoBadge/InfoBadge';
import LoginButton from '../../components/LoginButton/LoginButton';

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
                <Text style={styles.title}>Making Lunch</Text>
                <View style={styles.logo} />
                <View style={styles.loginContainer}>
                    <LoginButton
                        text={'Sing up with Facebook'}
                        onPress={() => console.log('Sing up with Facebook')}
                        color={'#4a90e2'}
                        iconContainerColor={'#4280cb'}
                    />

                    <TextInput
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

                    {this.state.failureFlag && <InfoBadge infoText={'lalala'} />}

                    <Button title={'Login'} style={styles.input} onPress={this.onLoginPress} />
                </View>
            </View>
        );
    }
}

export default Login;
