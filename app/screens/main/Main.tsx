import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styles from './style';

class Main extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Making Lunch</Text>
            </View>
        )
    }
}

export default Main;
