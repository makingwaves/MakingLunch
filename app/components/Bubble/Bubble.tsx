import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleProp, ViewStyle } from 'react-native';
import React, { FunctionComponent, memo, ReactNode } from 'react';

import styles from './style';

import Triangle, { triangleSides } from "@app/components/Triangle/Triangle";

export interface BubbleProps {
    readonly size?: number;
    readonly children?: ReactNode;
    readonly bubbleStyles?: StyleProp<ViewStyle>;
    readonly triangleSide?: triangleSides;
    readonly bubbleContainerStyles?: StyleProp<ViewStyle>;
};

const Bubble: FunctionComponent<BubbleProps> = ({
    bubbleContainerStyles = {}, bubbleStyles = {}, triangleSide = null, size = wp('10%'), children
}) => {
    return (
        <View style={[styles.container, bubbleContainerStyles]}>
            <View style={[styles.bubble, bubbleStyles]}>
                {children}
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide} />}
        </View>
    );
};

export default memo(Bubble);
