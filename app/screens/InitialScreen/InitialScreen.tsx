import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { AppState } from '@app/state/state';
import { navigationService } from '@app/services';

import styles from './style';

export interface InitialScreenProps extends NavigationScreenProps {
    token: string;
}

const LOGO = require('./assets/logo.png');

class InitialScreen extends Component<InitialScreenProps> {

    public componentDidUpdate(prevProps: InitialScreenProps): void {
        if (prevProps !== this.props) {
            navigationService.navigate(
                this.props.token ? 'App' : 'Auth'
            );
        }
    }

    public render() {
        return (
            <View style={styles.initialScreen}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.textScreen}>MakingLunch</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    token: state.auth.token
});


export default connect(
    mapStateToProps,
    null,
    null,
    {
        pure: false
    }
)(InitialScreen);