import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { AppMessage, AppMessageType } from '@app/state/app_messages/types';

import styles from './style';

const INFO_ICON = require('./assets/info.png');
const WARNING_ICON = require('./assets/warning.png');
const ERROR_ICON = require('./assets/error.png');

export default class AppPopupMsg extends Component<AppMessage> {

    constructor(props: AppMessage) {
        super(props);
    }

    public render() {
        let props = this.props;  // Q?

        function get_message_icon() {
            switch (props.type) {
                case AppMessageType.Success:
                case AppMessageType.Information:
                    return INFO_ICON;
                case AppMessageType.Warning:
                    return WARNING_ICON;
                case AppMessageType.Error:
                    return ERROR_ICON;
            };
        };

        function get_message_style() {
            switch (props.type) {
                case AppMessageType.Success:
                    return styles.success_message;
                case AppMessageType.Information:
                    return styles.info_message;
                case AppMessageType.Warning:
                    return styles.warning_message;
                case AppMessageType.Error:
                    return styles.error_message;
            };

            return null;
        }

        return (
            <View style={[styles.message_container, get_message_style()]}>
                <Image source={get_message_icon()} style={styles.icon} />
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.description}>{this.props.message}</Text>
                </View>
            </View>
        );
    };
}