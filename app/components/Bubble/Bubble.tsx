import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleProp, ViewStyle } from 'react-native';
import React, { FunctionComponent, memo, ReactNode } from 'react';

import styles from './style';

import Triangle, { triangleSides } from "@app/components/Triangle/Triangle";
import { PointerEventsProperty } from 'csstype';

export interface BubbleProps {
    readonly size?: number;
    readonly children?: ReactNode;
    readonly bubbleStyles?: StyleProp<ViewStyle>;
    readonly triangleSide?: triangleSides;
    readonly pointerEvents?: 'auto' | 'none' | 'box-only' | 'box-none';
    readonly bubbleContainerStyles?: StyleProp<ViewStyle>;
};

const Bubble: FunctionComponent<BubbleProps> = ({
    bubbleContainerStyles = {}, bubbleStyles = {}, triangleSide = null, size = wp('10%'), children, pointerEvents = 'auto'
}) => {
    return (
        <View style={[styles.container, bubbleContainerStyles]} pointerEvents={pointerEvents}>
            <View style={[styles.bubble, bubbleStyles]} pointerEvents={pointerEvents}>
                {children}
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide} />}
        </View>
    );
};

export default memo(Bubble);
