import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

const images: string = {
    Facebook: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    Mail: require('./img/mail.png')
};

export interface LoginButtonProps {
    text: string;
    color: string;
    iconContainerColor: string;
    onPress: () => any;
    type: string;
}

const LoginButton: React.SFC<LoginButtonProps> = props => {
    const source = images[props.type];
    const text = 'Sign up with ';

    return (
        <View style={[styles.container]}>
            <View style={[styles.loginButtonContainer, { backgroundColor: props.color }]}>
                <View style={[styles.iconContainer, { backgroundColor: props.iconContainerColor }]}>
                    <Image source={source} style={styles.icon} resizeMode="contain" />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {text}
                        <Text style={{ fontWeight: '700' }}>{props.type}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginButton;
