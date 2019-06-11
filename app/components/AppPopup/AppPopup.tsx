import React, { Component, Fragment } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import { AppState } from '@app/state/state';
import styles from './style';
import Display from '../Display';
import { AppMessage } from '@app/state/app_messages/types';
import { connect } from 'react-redux';


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
            <Fragment>
                {
                    msg.map((v: AppMessage) => {
                        return <Text>v.title</Text>
                    })
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    messages: state.appMessages.app_messages
});



export default connect(mapStateToProps)(AppPopup);
