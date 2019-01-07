import React, { Component, ReactElement } from 'react';
import { Keyboard, EmitterSubscription, Animated, StyleProp, ViewStyle, Text, RegisteredStyle } from 'react-native';

export interface KeyboardAnimationViewProps {
    keyboardHideStyles: {
        height: any;
        opacity: any;
    };
    keyboardShowStyles: {
        height: any;
        opacity: any;
    };
    animationViewStyles?: StyleProp<ViewStyle>;
};

export interface KeyboardAnimationViewState {
    height: Animated.Value;
    opacity: Animated.Value;
};

export enum Listeners {
    didShow = 'keyboardDidShow',
    didHide = 'keyboardDidHide'
};

export type ListenersObjectType = { [key in Listeners]: EmitterSubscription };

class KeyboardAnimationView extends Component<KeyboardAnimationViewProps, KeyboardAnimationViewState> {
    public state: KeyboardAnimationViewState;

    private listenersObject: ListenersObjectType;

    constructor(props: KeyboardAnimationViewProps) {
        super(props);

        this.state = {
            height: new Animated.Value(this.props.keyboardHideStyles.height),
            opacity: new Animated.Value(this.props.keyboardHideStyles.opacity)
        };
    }

    public componentDidMount(): void {
        this.listenersObject = this.getListeners();
    }

    public componentWillUnmount(): void {
        Object.keys(this.listenersObject)
            .map(key => this.listenersObject[key].remove());
    }

    private getListeners(): ListenersObjectType {
        return {
            [Listeners.didShow]: Keyboard.addListener(Listeners.didShow, this.onKeyboardShow),
            [Listeners.didHide]: Keyboard.addListener(Listeners.didHide, this.onKeyboardHide)
        }
    }

    private onKeyboardShow = () => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: this.props.keyboardShowStyles.opacity,
                duration: 300
            }),
            Animated.timing(this.state.height, {
                toValue: this.props.keyboardShowStyles.height,
                duration: 300
            })
        ]).start();
    }

    private onKeyboardHide = () => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: this.props.keyboardHideStyles.opacity,
                duration: 300
            }),
            Animated.timing(this.state.height, {
                toValue: this.props.keyboardHideStyles.height,
                duration: 300
            })
        ]).start();
    }

    public render(): ReactElement<Element> {
        const {
            children,
        } = this.props;
        const {
            height,
            opacity
        } = this.state;

        return (
            <Animated.View
                style={{
                    height,
                    opacity
                }}
            >
                {children}
            </Animated.View>
        );
    }
}

export default KeyboardAnimationView;