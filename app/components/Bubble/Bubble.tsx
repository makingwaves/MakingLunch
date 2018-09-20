import React, {Component} from 'react';
import { View } from 'react-native';
import styles from './style';
import { borderRadius, colors } from '../../config/styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Svg } from 'expo';

export interface BubbleProps {
    readonly color?: string;
    readonly borderRadius?: number,
    readonly borderRadiusTopLeft?: number;
    readonly borderRadiusTopRight?: number;
    readonly borderRadiusBottomLeft?: number;
    readonly borderRadiusBottomRight?: number;
    readonly triangleSide?: string;
    readonly size?: number;
}

export enum triangleSides {
    bottomLeft = 'bottomLeft',
    bottomRight = 'bottomRight',
    topLeft = 'topLeft',
    topRight = 'topRight'
}

class Bubble extends Component<BubbleProps> {


    createTriangleShape(side: string) {
        const { Polygon } = Svg;
        switch(side) {
            case triangleSides.bottomLeft:
                return <Polygon points="0 0, 0 100, 100 0" fill="url(#grad)" />;
            case triangleSides.bottomRight:
                return <Polygon points="0 0, 100 0, 100 100" fill="url(#grad)" />;
            case triangleSides.topRight:
                return <Polygon points="0 100, 100 0, 100 100" fill="url(#grad)" />;
            case triangleSides.topLeft:
                return <Polygon points="0 0, 100 100, 0 100" fill="url(#grad)" />;
            default:
                return "";
        }
    }

    render() {
        const { Defs, LinearGradient, Stop } = Svg;
        const { size, color, borderRadius, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomLeft, borderRadiusBottomRight, triangleSide, children } = this.props;
        const triangle = triangleSide ? this.createTriangleShape(triangleSide) : null;


        return (
            <View style={
                [
                    styles.container,
                    {
                        marginBottom: (triangleSide === triangleSides.bottomLeft  || triangleSide === triangleSides.bottomRight) ? size : 0,
                        marginTop: (triangleSide === triangleSides.topLeft  || triangleSide === triangleSides.topRight) ? size : 0,
                    }
                ]}>
                <View style={
                    [
                        styles.bubble,
                        {
                            backgroundColor: color,
                            borderRadius: borderRadius,
                            borderTopLeftRadius: borderRadiusTopLeft,
                            borderTopRightRadius: borderRadiusTopRight,
                            borderBottomLeftRadius: borderRadiusBottomLeft,
                            borderBottomRightRadius: borderRadiusBottomRight
                        }
                    ]}>
                    {children}
                </View>
                {(triangleSide !== '' && triangleSide !== undefined) ? (

                    <View
                        style={
                            [
                                styles.triangle,
                                {
                                    left: (triangleSide === triangleSides.topLeft || triangleSide === triangleSides.bottomLeft) ? 0 : 'auto',
                                    right: (triangleSide === triangleSides.topRight || triangleSide === triangleSides.bottomRight) ? 0 :'auto',
                                    top: (triangleSide === triangleSides.bottomRight || triangleSide === triangleSides.bottomLeft ) ? '100%' : -size
                                }
                            ]
                        }>
                        <Svg height={size}
                             width={size}
                             viewBox="0 0 100 100">
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                                    <Stop offset="1" stopColor={colors.backgroundColorDarkSecondary} stopOpacity="1"/>
                                    <Stop offset="0" stopColor={colors.backgroundColorDark} stopOpacity="1"/>
                                </LinearGradient>
                            </Defs>
                            {triangle}
                        </Svg>
                    </View>
                ) : null
                }
            </View>
        );
    }
}

Bubble.defaultProps = {
    color: colors.backgroundColorDark,
    borderRadius: borderRadius.borderRadiusBase,
    size: wp('10%')
};

export default Bubble;
