import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {borderRadius, colors} from '../../config/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Image from 'react-native-remote-svg';


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

    private getTriangleProperties(triangleSide: triangleSides) {
        switch (triangleSide) {
            case triangleSides.topLeft:
                return {left: 0, top: -this.props.size, transform: [{rotate: '-270deg'}]};
            case triangleSides.topRight:
                return {right: 0, top: -this.props.size, transform: [{rotate: '180deg'}]};
            case triangleSides.bottomLeft:
                return {left: 0, top: '100%'};
            case triangleSides.bottomRight:
                return {right: 0, top: '100%', transform: [{rotate: '90deg'}]};
            default:
                return {};
        }
    }

    public render() {
        const { size, triangleSide } = this.props;
        return (
            <View style={[styles.triangle, this.getTriangleProperties(triangleSide)]}>
                <Image
                    source={require('./triangle.svg')}
                    style={{width: size, height: size}}
                />
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
