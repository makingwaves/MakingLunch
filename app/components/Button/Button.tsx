import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

export interface ButtonProps {
    text: string;
    color?: string;
    iconContainerColor?: string;
    small?: boolean;
    onPress: () => any;
    // type: string;
}

const Button: React.SFC<ButtonProps> = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            {props.small && <View style={{ flex: 1 }} />}
            <View style={[styles.ButtonContainer, { backgroundColor: props.color, width: props.small ? 160 : 250 }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    color: '#5b4663',
    small: false
};

export default Button;
