import React, {Component} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {Text, View} from 'react-native';

class Settings extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
    }

    public render() {
        return (
            <View>
                <Text>Settings screen</Text>
            </View>
        );
    }
}

export default Settings;