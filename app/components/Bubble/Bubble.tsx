import React from 'react';
import { View } from 'react-native';
import styles from './style';
import {borderRadius, colors } from '../../config/styles';

export interface BubbleProps {
    readonly backgroundColor?: string;
    readonly borderRadius?: number,
    readonly borderRadiusTopLeft?: number;
    readonly borderRadiusTopRight?: number;
    readonly borderRadiusBottomLeft?: number;
    readonly borderRadiusBottomRight?: number;
}


const Bubble: React.SFC<BubbleProps> = props => {
    return (
        <View style={
            [
                styles.container,
                {
                    backgroundColor: props.backgroundColor,
                    borderRadius: props.borderRadius,
                    borderTopLeftRadius: props.borderRadiusTopLeft,
                    borderTopRightRadius: props.borderRadiusTopRight,
                    borderBottomLeftRadius: props.borderRadiusBottomLeft,
                    borderBottomRightRadius: props.borderRadiusBottomRight
                }
                ]}>
            {props.children}
        </View>
    );
};

Bubble.defaultProps = {
    backgroundColor: colors.backgroundColorDark,
    borderRadius: borderRadius.borderRadiusBase
};

export default Bubble;
