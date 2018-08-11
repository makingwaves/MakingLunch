import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class Intro2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Making Lunch</Text>
                <View style={styles.logo} />
            </View>
        );
    }
}

export default Intro2;
