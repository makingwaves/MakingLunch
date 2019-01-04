import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import styles from './style';
import { borderRadius, colors } from '../../config/styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Triangle, { triangleSides } from '../Triangle/Triangle';

export interface BubbleProps {
    readonly color?: string;
    readonly baseBorderRadius?: number;
    readonly borderRadiusTopLeft?: number;
    readonly borderRadiusTopRight?: number;
    readonly borderRadiusBottomLeft?: number;
    readonly borderRadiusBottomRight?: number;
    readonly triangleSide?: triangleSides;
    readonly size?: number;
}

const Bubble: FunctionComponent<BubbleProps> = (
    {   color = colors.brandColorPrimary,
        baseBorderRadius = borderRadius.borderRadiusBase,
        borderRadiusTopLeft = borderRadius.borderRadiusBase,
        borderRadiusTopRight = borderRadius.borderRadiusBase,
        borderRadiusBottomLeft = borderRadius.borderRadiusBase,
        borderRadiusBottomRight = borderRadius.borderRadiusBase,
        triangleSide,
        size = wp('10%'),
        children,
    }) => {

    const getMarginProperty = () => {
        if (
            triangleSide === triangleSides.topLeft ||
            triangleSide === triangleSides.topRight
        ) {
            return {marginTop: size};
        } else if (
            triangleSide === triangleSides.bottomLeft ||
            triangleSide === triangleSides.bottomRight
        ) {
            return {marginBottom: size};
        }
        return {};
    };
 
    const getBubbleProperties = () => {
        return {
            backgroundColor: color,
            borderRadius: baseBorderRadius,
            borderTopLeftRadius: borderRadiusTopLeft,
            borderTopRightRadius: borderRadiusTopRight,
            borderBottomLeftRadius: borderRadiusBottomLeft,
            borderBottomRightRadius: borderRadiusBottomRight,
        };
    };

    return (
        <View style={[styles.container, getMarginProperty()]}>
            <View style={[styles.bubble, getBubbleProperties()]}>
                {children}
            </View>
            {triangleSide && <Triangle size={size} triangleSide={triangleSide}/>}
        </View>
    );
};

export default Bubble;
