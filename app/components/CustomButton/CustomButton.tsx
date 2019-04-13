import { ViewStyle, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { memo, ReactNode, FunctionComponent, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, StyleProp, TextStyle } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';
import Triangle, { triangleSides } from "@app/components/Triangle/Triangle";

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
    readonly isLoading?: boolean;
    readonly activeOpacity?: number;
    readonly iconContainerColor?: string;
    readonly textAlignment?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    readonly triangleSide?: triangleSides;
    readonly size?: number;
    readonly containerStyles?: StyleProp<ViewStyle>;
    readonly buttonStyles?: StyleProp<ViewStyle>;
    readonly textButtonStyles?: StyleProp<TextStyle>;
    readonly imageType?: string;
    readonly children?: ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
    text, iconContainerColor, onPress, imageType, triangleSide, children, isLoading = false, size = wp('5%'), activeOpacity = 0.2, containerStyles = {}, buttonStyles = {}, textButtonStyles = {}, textAlignment = 'center'
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
            activeOpacity={activeOpacity}
        >
            <View style={[styles.customButtonContainer, buttonStyles, isLoading ? styles.buttonLoading : {}]}>
                {isLoading ? (
                    <ActivityIndicator color={colors.brandColorPrimary} />
                ) : (
                        <Fragment>
                            {getImage()}

                            <View style={[styles.textContainer, { alignItems: textAlignment }]}>
                                <Text style={[styles.text, textButtonStyles]}>
                                    {text}
                                </Text>
                            </View>
                        </Fragment>
                    )}
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide} />}
        </TouchableOpacity>
    );
};

export default memo(CustomButton);
