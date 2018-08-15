import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

export enum socialImageTypes {
    'Facebook' = './img/facebook.png',
    'Gmail' = './img/google.png',
    'Mail' = './img/mail.png'
}

export interface LoginButtonProps {
    readonly text: string;
    readonly color: string;
    readonly iconContainerColor: string;
    readonly onPress: () => any;
    readonly type: socialImageTypes;
}

const LoginButton: React.SFC<LoginButtonProps> = props => {
    // const socialType: keyof typeof socialImageTypes = props.type;
    // const pathToImage = socialImageTypes[socialType];
    // const source = require(pathToImage);
    const text = 'Sign up with ';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                console.log('button press');
            }}
        >
            <View style={[styles.loginButtonContainer, { backgroundColor: props.color }]}>
                <View style={[styles.iconContainer, { backgroundColor: props.iconContainerColor }]}>
                    <Image source={require('./img/mail.png')} style={styles.icon} resizeMode="contain" />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {text}
                        <Text style={{ fontWeight: '700' }}>{props.type}</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default LoginButton;
