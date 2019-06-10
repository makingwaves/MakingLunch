import React, { PureComponent } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import styles from './style';
import Display from '../Display';


export interface AppPopupProps {
    title: string;
    iconUrl?: ImageSourcePropType;
    showError: boolean;
    description?: string;
    showDuration: number;
};

export interface AppPopupState {
    isVisible: boolean;
};

class AppPopup extends PureComponent<AppPopupProps, AppPopupState> {
    public state: AppPopupState;

    constructor(props: AppPopupProps) {
        super(props);

        this.state = {
            isVisible: false
        };
    }

    public componentDidUpdate(prevProps: AppPopupProps, prevState: AppPopupState): void {
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
            <Display style={styles.container} enable={isVisible} enter={'fadeInDown'} exit={'fadeOutUp'} defaultDuration={300}>
                {iconUrl && <Image source={iconUrl} style={styles.icon} />}
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {description ? <Text style={styles.description}>{description}</Text> : null}
                </View>
            </Display>
        )
    }
}


export default AppPopup;