import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from './style';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onLoginPress = () => {
        console.log('try to login');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Making Lunch</Text>
                <View style={styles.logo} />
                <View style={styles.loginContainer}>
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

                    <Button title={'Login'} style={styles.input} onPress={this.onLoginPress} />
                </View>
            </View>
        );
    }
}

export default Login;
