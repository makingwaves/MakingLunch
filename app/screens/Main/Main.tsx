import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
                <TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('Guests');
                }}>
                    <Text>Guests screen</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Main;
