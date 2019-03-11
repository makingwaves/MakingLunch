import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import styles from './style';
import { colors } from '@app/config/styles';

import { AppState } from '@app/state/state';
import { navigationService } from '@app/services';
import { Profile, AuthSagaActions } from '@app/state/auth/types';

export interface InitialScreenProps extends NavigationScreenProps {
    token: string;
    userData: Profile;
    getUserData: () => void;
};

const LOGO = require('./assets/logo.png');

class InitialScreen extends Component<InitialScreenProps> {

    public componentDidMount(): void {
        this.props.getUserData();
    }

    public componentDidUpdate(prevProps: InitialScreenProps): void {
        if (prevProps !== this.props && prevProps.userData !== this.props.userData)
            navigationService.navigateAndReset(this.isUserLogged(this.props.userData) ? 'App' : 'Auth')
    }

    private isUserLogged(userData: Profile): boolean {
        return !!(userData && userData.id);
    }

    public render() {
        return (
            <View style={styles.initialScreen}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.textScreen}>MakingLunch</Text>
                <View style={styles.informationContainer}>
                    <Text style={styles.text}>Authorizing user..</Text>
                    <ActivityIndicator color={colors.colorLightest} size={'small'} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    token: state.auth.token,
    userData: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthSagaActions.GET_USER_DATA_WITH_TOKEN })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialScreen);