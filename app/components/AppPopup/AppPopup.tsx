import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import TransitionGroup, { FadeInOutTransition } from 'react-native-transitiongroup';

import { AppState } from '@app/state/state';
import { AppMessage } from '@app/state/app_messages/types';
import AppPopupMsg from "./AppPopupMsg"

import styles from './style';

interface AppPopupProps {
    messages: AppMessage[];
}

class AppPopup extends Component<AppPopupProps> {

    constructor(props: AppPopupProps) {
        super(props);
    }

    public render() {
        let msg = this.props.messages;

        return (
            <View style={styles.container}>
                <TransitionGroup>
                    {
                        msg.map((v: AppMessage) => {
                            return (
                                <FadeInOutTransition key={`app_msg__${v.id}`}>
                                    <AppPopupMsg key={v.id} {...v} />
                                </FadeInOutTransition>
                            );
                        })
                    }
                </TransitionGroup>
            </ View>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    messages: state.appMessages.app_messages
});

export default connect(mapStateToProps)(AppPopup);
