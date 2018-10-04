import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {borderRadius, colors} from '../../config/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Svg} from 'expo';

export interface TriangleProps {
    readonly triangleSide?: string;
    readonly size?: number;
}

export enum triangleSides {
    bottomLeft = 'bottomLeft',
    bottomRight = 'bottomRight',
    topLeft = 'topLeft',
    topRight = 'topRight',
}

class Triangle extends Component<TriangleProps> {

    private createTriangleShape(side: string) {
        const { Polygon } = Svg;
        switch (side) {
            case triangleSides.bottomLeft:
                return <Polygon points="0 0, 0 100, 100 0" fill="url(#grad)" />;
            case triangleSides.bottomRight:
                return <Polygon points="0 0, 100 0, 100 100" fill="url(#grad)" />;
            case triangleSides.topRight:
                return <Polygon points="0 100, 100 0, 100 100" fill="url(#grad)" />;
            case triangleSides.topLeft:
                return <Polygon points="0 0, 100 100, 0 100" fill="url(#grad)" />;
            default:
                return '';
        }
    }

    public render() {
        const { Defs, LinearGradient, Stop } = Svg;
        const { size, triangleSide } = this.props;
        const triangle = triangleSide ? this.createTriangleShape(triangleSide) : null;
        return (
            <View
                style={
                    [
                        styles.triangle,
                        {
                            left: (triangleSide === triangleSides.topLeft || triangleSide === triangleSides.bottomLeft) ? 0 : 'auto',
                            right: (triangleSide === triangleSides.topRight || triangleSide === triangleSides.bottomRight) ? 0 : 'auto',
                            top: (triangleSide === triangleSides.bottomRight || triangleSide === triangleSides.bottomLeft) ? '100%' : -size,
                        },
                    ]
                }
            >
                <Svg
                    height={size}
                    width={size}
                    viewBox="0 0 100 100"
                >
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                            <Stop offset="1" stopColor="#412b4a" stopOpacity="1"/>
                            <Stop offset="0" stopColor="#5b4663" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    {triangle}
                </Svg>
            </View>
        );
    }
}

Triangle.defaultProps = {
    color: colors.brandColorPrimary,
    borderRadius: borderRadius.borderRadiusBase,
    size: wp('10%'),
};

export default Triangle;
