import React, { Component, ReactElement } from 'react';
import { Keyboard, EmitterSubscription, Animated, StyleProp, ViewStyle, Text, RegisteredStyle, StyleSheet } from 'react-native';

export interface KeyboardAnimationViewProps {
    duration: number;
    keyboardHideStyles: StyleProp<ViewStyle>;
    keyboardShowStyles: StyleProp<ViewStyle>;
    animationViewStyles?: StyleProp<ViewStyle>;
};

export enum Listeners {
    didShow = 'keyboardDidShow',
    didHide = 'keyboardDidHide'
};

export type ListenersObjectType = { [key in Listeners]: EmitterSubscription };

class KeyboardAnimationView extends Component<KeyboardAnimationViewProps> {
    private listenersObject: ListenersObjectType;

    private animatedKeysStyles: string[];
    private animatedStylesValues: { [key: string]: Animated.Value };

    constructor(props: KeyboardAnimationViewProps) {
        super(props);
        
        this.animatedKeysStyles = this.getAnimatedKeysStyles(this.props.keyboardShowStyles, this.props.keyboardHideStyles);
        this.animatedStylesValues = this.getAnimatedObjectValues(this.animatedKeysStyles, this.props.keyboardHideStyles);
    }

    public componentDidMount(): void {
        this.listenersObject = this.getListeners();
    }

    public componentWillUnmount(): void {
        Object.keys(this.listenersObject)
            .map(key => this.listenersObject[key].remove());
    }

    private getAnimatedObjectValues(animatedKeys: string[], initialStyles: StyleProp<ViewStyle>): { [key: string]: Animated.Value } {
        return animatedKeys && animatedKeys
            .reduce((animatedObject, key) => (animatedObject[key] = new Animated.Value(initialStyles[key]),animatedObject ), {});
    }

    private getAnimatedKeysStyles(keyboardShowStyles: StyleProp<ViewStyle>, keyboardHideStyles: StyleProp<ViewStyle>): string[] {
        const [showKeys, hideKeys] = [
            Object.keys(keyboardShowStyles),
            Object.keys(keyboardHideStyles)
        ];
        if(!this.areKeysTheSame(showKeys, hideKeys))
            throw new Error('KeyboardAnimationView - Given props object keys are not the same. Fix it.');
        return showKeys;
    }

    private areKeysTheSame(firstArray: string[], secondArray: string[]): boolean {
        return firstArray.length === secondArray.length && !firstArray.some(showKey => !secondArray.includes(showKey));
    }

    private getListeners(): ListenersObjectType {
        return {
            [Listeners.didShow]: Keyboard.addListener(Listeners.didShow, this.onKeyboardShow),
            [Listeners.didHide]: Keyboard.addListener(Listeners.didHide, this.onKeyboardHide)
        }
    }

    private getAnimationArray(keys: string[], stateStylesObject: StyleProp<ViewStyle>, valuesObject: { [key: string]: Animated.Value }): Animated.CompositeAnimation[] {
        return keys && keys
            .map(key => Animated.timing(valuesObject[key], {
                toValue: stateStylesObject[key],
                duration: this.props.duration
            }));
    }

    private onKeyboardShow = () => {
        Animated.parallel(
            this.getAnimationArray(this.animatedKeysStyles, this.props.keyboardShowStyles, this.animatedStylesValues)
        ).start();
    }

    private onKeyboardHide = () => {
        Animated.parallel(
            this.getAnimationArray(this.animatedKeysStyles, this.props.keyboardHideStyles, this.animatedStylesValues)
        ).start();
    }

    public render(): ReactElement<Element> {
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

export default KeyboardAnimationView;