import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React, { PureComponent } from 'react';

import styles from './style';

import ConditionalAnimation from '../ConditionalAnimation';

export interface ErrorPopupProps {
    title: string;
    iconUrl?: ImageSourcePropType;
    showError: boolean;
    description?: string;
    showDuration?: number;
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
            <View style={styles.container}>
                <ConditionalAnimation
                    duration={300}
                    condition={isVisible}
                    showAnimationStyles={styles.showAnimationStyles}
                    hideAnimatioStyles={styles.hideAnimatioStyles}
                >
                    <View style={styles.animationViewStyles}>
                        {iconUrl && <Image source={iconUrl} style={styles.icon} />}
                        <View style={styles.textsContainer}>
                            <Text style={styles.title}>{title}</Text>
                            {description ? <Text style={styles.description}>{description}</Text> : null}
                        </View>
                    </View>
                </ConditionalAnimation>
            </View>
        )
    }
}


export default ErrorPopup;