import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import React, { memo, FunctionComponent } from "react";
import { View, StyleProp, ViewStyle, ImageStyle } from "react-native";

import styles from './style';

import Triangle, { triangleSides } from "@app/components/Triangle/Triangle";

export interface AvatarProps {
    readonly photo: string;
    readonly triangleSide?: triangleSides;
    readonly size?: number;
    readonly imageContainer?: StyleProp<ViewStyle>;
    readonly imageStyles?: StyleProp<ImageStyle>;
    readonly imageWidth?: number;
};

const Avatar: FunctionComponent<AvatarProps> = ({
    photo, triangleSide, size = wp('8%'), imageContainer = {}, imageStyles = {}, imageWidth = Math.floor(wp('100%'))
}) => {
    const mapPhoto = (photo: string): string => {
        if (photo && typeof photo === 'string')
            return photo.includes('googleusercontent') ? mapGooglePhoto(photo) : mapFacebookPhoto(photo);
    }
    const mapGooglePhoto = (photo: string): string => photo + '?sz=' + imageWidth
    const mapFacebookPhoto = (photo: string): string => photo + '?width=' + imageWidth;

    const mappedPhoto = mapPhoto(photo);

    return (
        <View style={[styles.imageContainer, imageContainer]}>
            {photo && <FastImage style={[styles.imageStyles, imageStyles]} source={{ uri: mappedPhoto }} />}
            {triangleSide && <Triangle size={size} triangleSide={triangleSide} />}
        </View>
    )
}

export default memo(Avatar);