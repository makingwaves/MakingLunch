import { View } from 'react-native';
import React, { Component } from 'react';

import styles from './style';

import Menu from './Menu';
import MainContent from './MainContent';

class Main extends Component {

    public render() {
        return (
            <View style={styles.mainContainer}>
                <Menu />
                <MainContent />
            </View>
        );
    }
}

export default Main;