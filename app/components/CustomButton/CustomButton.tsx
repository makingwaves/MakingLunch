import React, { memo, ReactNode }  from 'react';
import { View, Text, Image, TouchableOpacity, RegisteredStyle } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import styles from './style';
import Triangle, { triangleSides } from '../Triangle/Triangle';

const images = {
    Facebook: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    Settings: require('./img/settings.png'),
    Logout: require('./img/logout.png'),
    Lunch: require('./img/lunch.png'),
};

export interface CustomButtonProps {
    readonly text: string;
    readonly onPress: () => void;
    readonly iconContainerColor?: string; 
    readonly textAlignment?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    readonly triangleSide?: triangleSides;
    readonly size?: number;
    readonly containerStyles?: RegisteredStyle<{[key: string]: string | number}>
    readonly buttonStyles?: RegisteredStyle<{[key: string]: string | number}>;
    readonly imageType?: string;
    readonly children?: ReactNode;
} 

const CustomButton: React.SFC<CustomButtonProps> = ({
    text, iconContainerColor, onPress, imageType, triangleSide, children, size = wp('5%'), containerStyles = {}, buttonStyles = {}, textAlignment = 'center'
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
            <View style={[styles.customButtonContainer, buttonStyles]}>
                {getImage()} 

                <View style={[styles.textContainer, { alignItems: textAlignment }]}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide}/>}
        </TouchableOpacity>
    );
};

export default memo(CustomButton);
