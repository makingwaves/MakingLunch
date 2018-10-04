import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {borderRadius, colors} from '../../config/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Svg} from 'expo';
import Triangle,  {triangleSides} from '../Triangle/Triangle';

export interface BubbleProps {
    readonly color?: string;
    readonly baseBorderRadius?: number;
    readonly borderRadiusTopLeft?: number;
    readonly borderRadiusTopRight?: number;
    readonly borderRadiusBottomLeft?: number;
    readonly borderRadiusBottomRight?: number;
    readonly triangleSide?: string;
    readonly size?: number;
}

class Bubble extends Component<BubbleProps> {

    private createTriangle(triangleSide: any, size: number) {
        return (triangleSide !== '' && triangleSide !== undefined) ? <Triangle size={size} triangleSide={triangleSide}/> : null;
    }

    public render() {
        const {
            size,
            color,
            baseBorderRadius,
            borderRadiusTopLeft,
            borderRadiusTopRight,
            borderRadiusBottomLeft,
            borderRadiusBottomRight,
            triangleSide,
            children,
        } = this.props;

        return (
            <View
                style={
                [
                    styles.container,
                    {
                        marginBottom: (triangleSide === triangleSides.bottomLeft  || triangleSide === triangleSides.bottomRight) ? size : 0,
                        marginTop: (triangleSide === triangleSides.topLeft  || triangleSide === triangleSides.topRight) ? size : 0,
                    },
                ]}
            >
                <View
                    style={
                    [
                        styles.bubble,
                        {
                            backgroundColor: color,
                            borderRadius: baseBorderRadius,
                            borderTopLeftRadius: borderRadiusTopLeft,
                            borderTopRightRadius: borderRadiusTopRight,
                            borderBottomLeftRadius: borderRadiusBottomLeft,
                            borderBottomRightRadius: borderRadiusBottomRight,
                        },
                    ]}
                >
                    {children}
                </View>
                {this.createTriangle(triangleSide, size)}
            </View>
        );
    }
}

Bubble.defaultProps = {
    color: colors.brandColorPrimary,
    baseBorderRadius: borderRadius.borderRadiusBase,
    size: wp('10%'),
};

export default Bubble;
