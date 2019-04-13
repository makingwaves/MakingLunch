import * as Animatable from 'react-native-animatable';
import { Dimensions, ViewStyle, StyleProp } from 'react-native';
import React, { PureComponent, createRef, RefObject } from 'react';

const screen = Dimensions.get('window');
const WIDTH = screen.width;
const HEIGHT = screen.height;

const DEFAULT_DURATION = 250;

export interface DisplayProps {
    exit: string;
    enter: string;
    style?: StyleProp<ViewStyle>;
    enable: boolean;
    keepAlive?: boolean;
    exitDuration?: number;
    pointerEvents?: 'none' | 'auto' | 'box-only' | 'box-none';
    enterDuration?: number;
    defaultDuration?: number;
};

export interface DisplayState {
    enable: boolean;
};

export default class Display extends PureComponent<DisplayProps, DisplayState> {
    public state: DisplayState;

    private viewRef: RefObject<any>;

    constructor(props: DisplayProps) {
        super(props);

        this.viewRef = createRef();

        this.state = {
            enable: this.props.enable
        };
    }

    static getDerivedStateFromProps(nextProps: DisplayProps, state: DisplayState): DisplayState {
        if (nextProps.enable)
            return { enable: true };
        return null;
    }

    public componentDidUpdate(prevProps: DisplayProps, prevState: DisplayState): void {
        if (prevProps !== this.props && prevProps.enable !== this.props.enable) {
            if (this.props.enable) {
                this.setState(prevState => ({
                    enable: true
                }), () => {
                    const duration = this.props.enterDuration || this.props.defaultDuration || DEFAULT_DURATION;
                    if (this.props.enter)
                        this.viewRef.current[this.props.enter](duration);
                })
            }
            else {
                const duration = this.props.exitDuration || this.props.defaultDuration || DEFAULT_DURATION;
                if (this.props.exit && this.viewRef.current)
                    this.viewRef.current[this.props.exit](duration)
                        .then(_ => this.setState(prevState => ({
                            enable: false
                        })));
            }
        }
    }

    private enableStyle(): object {
        if (this.state.enable)
            return {};

        return {
            position: 'absolute',
            top: HEIGHT,
            left: WIDTH,
            height: 0,
            width: 0,
        };
    }

    public render() {
        const {
            style,
            children,
            keepAlive,
            pointerEvents = 'auto'
        } = this.props;
        const {
            enable
        } = this.state;

        if (enable == false && keepAlive != true)
            return null;

        return (
            <Animatable.View ref={this.viewRef} style={[style, this.enableStyle.bind(this)()]} pointerEvents={pointerEvents}>
                {children}
            </Animatable.View>
        );
    }
}