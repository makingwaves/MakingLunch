import React, { Component } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export interface ConditionalAnimationProps {
    duration: number;
    condition: boolean;
    showAnimationStyles: StyleProp<ViewStyle>;
    hideAnimatioStyles: StyleProp<ViewStyle>;
    animationViewStyles?: StyleProp<ViewStyle>;
};

export enum AnimationType {
    Hide, Show
};

class ConditionalAnimation extends Component<ConditionalAnimationProps> {
    private animationType: { [key in AnimationType]: () => void } = {
        [AnimationType.Show]: this.showAnimation.bind(this),
        [AnimationType.Hide]: this.hideAnimation.bind(this)
    };

    private animatedKeysStyles: string[];
    private animatedStylesValues: { [key: string]: Animated.Value };

    constructor(props: ConditionalAnimationProps) {
        super(props);

        this.animatedKeysStyles = this.getAnimatedKeysStyles(this.props.showAnimationStyles, this.props.hideAnimatioStyles);
        this.animatedStylesValues = this.getAnimatedObjectValues(this.animatedKeysStyles, this.props.hideAnimatioStyles);
    }

    public componentDidUpdate(prevProps: ConditionalAnimationProps): void {
        if (prevProps.condition !== this.props.condition)
            this.animationType[Number(this.props.condition)]();
    }

    private getAnimatedObjectValues(animatedKeys: string[], initialStyles: StyleProp<ViewStyle>): { [key: string]: Animated.Value } {
        return animatedKeys && animatedKeys
            .reduce((animatedObject, key) => (animatedObject[key] = new Animated.Value(initialStyles[key]), animatedObject), {});
    }

    private getAnimatedKeysStyles(keyboardShowStyles: StyleProp<ViewStyle>, keyboardHideStyles: StyleProp<ViewStyle>): string[] {
        const [showKeys, hideKeys] = [
            Object.keys(keyboardShowStyles),
            Object.keys(keyboardHideStyles)
        ];
        if (!this.areKeysTheSame(showKeys, hideKeys))
            throw new Error('ConditionalAnimation - Given props object keys are not the same. Fix it.');
        return showKeys;
    }

    private areKeysTheSame(firstArray: string[], secondArray: string[]): boolean {
        return firstArray.length === secondArray.length && !firstArray.some(showKey => !secondArray.includes(showKey));
    }

    private getAnimationArray(keys: string[], stateStylesObject: StyleProp<ViewStyle>, valuesObject: { [key: string]: Animated.Value }): Animated.CompositeAnimation[] {
        return keys && keys
            .map(key => Animated.timing(valuesObject[key], {
                toValue: stateStylesObject[key],
                duration: this.props.duration
            }));
    }

    private showAnimation(): void {
        Animated.parallel(
            this.getAnimationArray(this.animatedKeysStyles, this.props.showAnimationStyles, this.animatedStylesValues)
        ).start();
    }

    private hideAnimation(): void {
        Animated.parallel(
            this.getAnimationArray(this.animatedKeysStyles, this.props.hideAnimatioStyles, this.animatedStylesValues)
        ).start();
    }

    public render() {
        const {
            children,
            animationViewStyles
        } = this.props;

        return (
            <Animated.View
                style={{
                    animationViewStyles,
                    ...this.animatedStylesValues
                }}
            >
                {children}
            </Animated.View>
        );
    }
}

export default ConditionalAnimation;