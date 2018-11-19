import React, {Component} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {Button, Text, View} from 'react-native';

class Lunch extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
    }

    public render() {
        return (
            <View>
                <Text>Single lunch</Text>
                <Button title={'Lunch chat'} onPress={() => this.props.navigation.navigate('Chat')}/>
            </View>
        );
    }
}

export default Lunch;
