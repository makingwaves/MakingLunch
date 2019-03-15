import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';

import { AppState } from '@app/state/state';
import { AuthSagaActions } from '@app/state/auth/types';
import { navigationService } from '@app/services';

export interface InitialScreenProps extends NavigationScreenProps {
    token: string;
    getUserToken: () => void;
};

const LOGO = require('./assets/logo.png');

class InitialScreen extends Component<InitialScreenProps> {

    public componentDidMount(): void {
        this.props.getUserToken();
    }

    public componentDidUpdate(prevProps: InitialScreenProps): void {
        if (prevProps !== this.props)
            navigationService.navigate(
                this.props.token ? 'App' : 'Auth'
            );
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

const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch({ type: AuthSagaActions.GET_USER_TOKEN })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(InitialScreen);