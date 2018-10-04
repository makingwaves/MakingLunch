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

    private createTriangle() {
        if (this.props.triangleSide !== '' && this.props.triangleSide !== undefined) {
            return <Triangle size={this.props.size} triangleSide={this.props.triangleSide}/>;
        }
        return null;
    }

    private setMarginProperty() {
        if (
            this.props.triangleSide === triangleSides.topLeft ||
            this.props.triangleSide === triangleSides.topRight
        ) {
            return {marginTop: this.props.size};
        } else if (
            this.props.triangleSide === triangleSides.bottomLeft ||
            this.props.triangleSide === triangleSides.bottomRight
        ) {
            return {marginBottom: this.props.size};
        }
        return {};
    }

    private setBubbleProperties() {
        return {
            backgroundColor: this.props.color,
            borderRadius: this.props.baseBorderRadius,
            borderTopLeftRadius: this.props.borderRadiusTopLeft,
            borderTopRightRadius: this.props.borderRadiusTopRight,
            borderBottomLeftRadius: this.props.borderRadiusBottomLeft,
            borderBottomRightRadius: this.props.borderRadiusBottomRight,
        };
    }

    public render() {
        const {children} = this.props;

        return (
            <View style={[styles.container, this.setMarginProperty()]}>
                <View style={[styles.bubble, this.setBubbleProperties()]}>
                    {children}
                </View>
                {this.createTriangle()}
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
