import React from 'react';
import { View } from 'react-native';
import styles from './style';
import {borderRadius, colors } from '../../config/styles';

export interface BubbleProps {
    readonly color?: string;
    readonly borderRadius?: number,
    readonly borderRadiusTopLeft?: number;
    readonly borderRadiusTopRight?: number;
    readonly borderRadiusBottomLeft?: number;
    readonly borderRadiusBottomRight?: number;
    readonly hasTriangleBottomLeft?: boolean;
    readonly hasTriangleBottomRight?: boolean;
    readonly hasTriangleTopLeft?: boolean;
    readonly hasTriangleTopRight?: boolean;
    readonly size?: number;
}

const Bubble: React.SFC<BubbleProps> = props => {
    return (
        <View style={
            [
                styles.container,
                {
                    marginBottom: ( props.hasTriangleBottomLeft || props.hasTriangleBottomRight ) ? props.size : 0,
                    marginTop: ( props.hasTriangleTopLeft || props.hasTriangleTopRight ) ? props.size : 0,
                }
            ]}>
        <View style={
            [
                styles.bubble,
                {
                    backgroundColor: props.color,
                    borderRadius: props.borderRadius,
                    borderTopLeftRadius: props.borderRadiusTopLeft,
                    borderTopRightRadius: props.borderRadiusTopRight,
                    borderBottomLeftRadius: props.borderRadiusBottomLeft,
                    borderBottomRightRadius: props.borderRadiusBottomRight
                }
                ]}>
            {props.children}
        </View>
            { (props.hasTriangleBottomLeft || props.hasTriangleBottomRight || props.hasTriangleTopLeft || props.hasTriangleTopRight) ? (
                <View style={
                [
                    styles.triangle,
                    props.hasTriangleBottomLeft ? styles.triangleBottomLeft : null,
                    props.hasTriangleBottomRight ? styles.triangleBottomRight : null,
                    props.hasTriangleTopLeft ? styles.triangleTopLeft : null,
                    props.hasTriangleTopRight ? styles.triangleTopRight : null,
                    {
                        borderWidth: props.size,
                        borderColor: props.color,
                        top: ( props.hasTriangleBottomLeft || props.hasTriangleBottomRight ) ? '100%' : -props.size
                    }
                ]
                }></View>
                ) : null
            }
        </View>
    );
};

Bubble.defaultProps = {
    color: colors.backgroundColorDark,
    borderRadius: borderRadius.borderRadiusBase,
    size: 40
};

export default Bubble;
