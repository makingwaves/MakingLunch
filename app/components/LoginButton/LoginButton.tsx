import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export interface LoginButtonProps {
    text: string;
    color: string;
    iconContainerColor: string;
    onPress: () => any;
}

const LoginButton: React.SFC<LoginButtonProps> = props => (
    <View style={[styles.container]}>
        <View style={[styles.loginButtonContainer, { backgroundColor: props.color }]}>
            {/* Facebook icon placeholder */}
            <View style={[styles.icon, { backgroundColor: props.iconContainerColor }]}>
                <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>f</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    </View>
);

export default LoginButton;
