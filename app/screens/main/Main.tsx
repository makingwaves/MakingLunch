import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from './style';
import InfoBadge from '../../components/InfoBadge/InfoBadge';

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
            
            this.props.navigation.navigate('Main');
        } else {
            this.setState({ failureFlag: true });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Making Lunch</Text>
            </View>
        );
    }
}

export default Login;
