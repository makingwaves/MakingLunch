import React, { FunctionComponent, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';

import Triangle, { triangleSides } from '../Triangle/Triangle';

export interface BubbleProps {
    readonly bubbleContainerStyles?: StyleProp<ViewStyle>;
    readonly bubbleStyles?: StyleProp<ViewStyle>;
    readonly triangleSide?: triangleSides;
    readonly size?: number;
};

const Bubble: FunctionComponent<BubbleProps> = ({
    bubbleContainerStyles = {}, bubbleStyles = {}, triangleSide = null, size = wp('10%'), children
}) => {
    return (
        <View style={[styles.container, bubbleContainerStyles]}>
            <View style={[styles.bubble, bubbleStyles]}>
                {children}
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide}/>}
        </View>
    );
};

export default memo(Bubble);
