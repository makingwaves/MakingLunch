import Display from 'react-native-display';
import React, { PureComponent } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import styles from './style';


export interface ErrorPopupProps {
    title: string;
    iconUrl?: ImageSourcePropType;
    showError: boolean;
    description?: string;
    showDuration: number;
};

export interface ErrorPopupState {
    isVisible: boolean;
};

class ErrorPopup extends PureComponent<ErrorPopupProps, ErrorPopupState> {
    public state: ErrorPopupState;

    constructor(props: ErrorPopupProps) {
        super(props);

        this.state = {
            isVisible: false
        };
    }

    public componentDidUpdate(prevProps: ErrorPopupProps, prevState: ErrorPopupState): void {
        if (!this.state.isVisible && (prevProps !== this.props && this.props.showError))
            this.setState(prevState => ({
                isVisible: true
            }), () => {
                setTimeout(() => (
                    this.setState(prevState => ({ isVisible: false }))
                ), this.props.showDuration);
            });
    }

    public render() {
        const {
            title,
            iconUrl,
            description,
        } = this.props;
        const {
            isVisible
        } = this.state;

        return (
            <Display style={styles.container} enable={isVisible} enter={'bounceInDown'} exit={'bounceOutUp'} defaultDuration={300}>
                {iconUrl && <Image source={iconUrl} style={styles.icon} />}
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {description ? <Text style={styles.description}>{description}</Text> : null}
                </View>
            </Display>
        )
    }
}


export default ErrorPopup;