import React, { Component, Fragment } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import { AppState } from '@app/state/state';
import styles from './style';

import { AppMessage } from '@app/state/app_messages/types';
import { connect } from 'react-redux';

import AppPopupMsg from "./AppPopupMsg"

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
                {
                    msg.map((v: AppMessage) => {
                        return <AppPopupMsg key={v.id} {...v} />
                    })
                }
            </ View>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    messages: state.appMessages.app_messages
});


export default connect(mapStateToProps)(AppPopup);
