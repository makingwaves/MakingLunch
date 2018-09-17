import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
    mail = 'Mail',
}

const socialImages = {
    Facebook: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    Mail: require('./img/mail.png'),
};

export interface LoginButtonProps {
    readonly text: string;
    readonly color: string;
    readonly iconContainerColor: string;
    readonly onPress: () => any;
    readonly type: socialTypes;
}

const LoginButton: React.SFC<LoginButtonProps> = (props) => {
    const text = 'Sign up with ';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
        >
            <View style={[styles.loginButtonContainer, { backgroundColor: props.color }]}>
                <View style={[styles.iconContainer, { backgroundColor: props.iconContainerColor }]}>
                    <Image source={socialImages[props.type]} style={styles.icon} resizeMode="contain" />
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
