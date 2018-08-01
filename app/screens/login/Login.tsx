import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Making Lunch</Text>
            </View>
        );
    }
}

export default Login;
