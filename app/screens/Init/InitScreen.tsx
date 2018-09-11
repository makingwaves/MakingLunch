import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styles from './style';

class Loader extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
        this._bootstrapApp();
    }

    async _bootstrapApp() {
        setTimeout(() => {
            this.props.navigation.navigate('Auth');
        }, 10000);
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={'#000000'} size={'large'} />
            </View>
        );
    }
}

export default Loader;
