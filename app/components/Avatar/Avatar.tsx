import React, { memo } from "react";
import { View, Image, RegisteredStyle } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import styles from './style';

import Triangle from "../Triangle";
import { triangleSides } from "../Triangle/Triangle";

export interface AvatarProps {
    readonly photo: string;
    readonly triangleSide?: triangleSides;
    readonly size?: number;
    readonly imageContainer?: RegisteredStyle<{[key: string]: string | number}>
    readonly imageStyles?: RegisteredStyle<{[key: string]: string | number}>;
};

const Avatar: React.SFC<AvatarProps> = ({
    photo, triangleSide, size = wp('8%'), imageContainer = {}, imageStyles = {}
}) => (
    <View style={[styles.imageContainer, imageContainer]}>
        {photo && <Image style={[styles.imageStyles, imageStyles]} source={{ uri: photo }} resizeMode={'cover'} />}
        {triangleSide && <Triangle size={size} triangleSide={triangleSide} />}
    </View>
);

export default memo(Avatar);