import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Image from 'react-native-remote-svg';

export interface TriangleProps {
    readonly triangleSide: triangleSides;
    readonly size?: number;
}

export enum triangleSides {
    bottomLeft = 'bottomLeft',
    bottomRight = 'bottomRight',
    topLeft = 'topLeft',
    topRight = 'topRight',
}

const Triangle: React.SFC<TriangleProps> = ({size = wp('10%'),  triangleSide}) => {

    const getTriangleProperties = (side: triangleSides) => {
        switch (side) {
            case triangleSides.topLeft:
                return {left: 0, top: -size, transform: [{rotate: '-270deg'}]};
            case triangleSides.topRight:
                return {right: 0, top: -size, transform: [{rotate: '180deg'}]};
            case triangleSides.bottomLeft:
                return {left: 0, top: '100%'};
            case triangleSides.bottomRight:
                return {right: 0, top: '100%', transform: [{rotate: '90deg'}]};
            default:
                return {};
        }
    };

    return (
        <View style={[styles.triangle, getTriangleProperties(triangleSide)]}>
            <Image
                source={require('./triangle.svg')}
                style={{width: size, height: size}}
            />
        </View>
    );
};

export default Triangle;
