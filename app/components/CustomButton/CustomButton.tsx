import React, { memo, ReactNode }  from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, RegisteredStyle } from 'react-native';

import styles from './style';

const images = {
    Facebook: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    Settings: require('./img/settings.png'),
    Logout: require('./img/logout.png'),
    Lunch: require('./img/lunch.png'),
};

export interface CustomButtonProps {
    readonly text: string;
    readonly color: string;
    readonly iconContainerColor: string;
    readonly onPress: () => void;
    readonly textAlignment?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    readonly containerStyles?: RegisteredStyle<{[key: string]: string | number}>
    readonly imageType?: string;
    readonly children?: ReactNode;
} 

const CustomButton: React.SFC<CustomButtonProps> = ({
    text, color, iconContainerColor, onPress, imageType, children, containerStyles = {}, textAlignment = 'center'
}) => {

    const getImage = (): ReactNode | React.ReactElement<View> => {
        return children ? children : imageType && (
            <View style={[styles.iconContainer, { backgroundColor: iconContainerColor }]}>
                <Image source={images[imageType]} style={styles.icon} resizeMode="contain" />
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.container, containerStyles]}
            onPress={onPress}
        >
            <View style={[styles.customButtonContainer, { backgroundColor: color }]}>
                {getImage()} 

                <View style={[styles.textContainer, { alignItems: textAlignment }]}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
