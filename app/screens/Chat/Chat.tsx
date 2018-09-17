import React, {Component} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {Text, View} from 'react-native';

class Chat extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
    }

    public render() {
        return (
            <View>
                <Text>Chat screen</Text>
            </View>
        );
    }
}

export default Chat;
