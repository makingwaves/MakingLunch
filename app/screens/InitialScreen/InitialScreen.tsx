import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { NavigationScreenProps, StackActions, NavigationActions } from 'react-navigation';

import styles from './style';

import { AppState } from '@app/state/state';
import { navigationService } from '@app/services';
import { Profile, AuthSagaActions } from '@app/state/auth/types';


export interface InitialScreenProps extends NavigationScreenProps {
    userData: Profile;
    getUserData: () => void;
};

class InitialScreen extends Component<InitialScreenProps> {
    constructor(props: InitialScreenProps) {
        super(props);
    }

    public componentDidMount(): void {
        this.props.getUserData();
    }

    public componentDidUpdate(prevProps: InitialScreenProps): void {
        if (prevProps !== this.props)
            navigationService.navigateAndReset(this.isUserLogged(this.props.userData) ? 'App' : 'Auth')
    }

    private isUserLogged(userData: Profile): boolean {
        return !!(userData && userData.id);
    }

    public render() {
        return (
            <View style={styles.initialScreen}>
                <Text style={styles.textScreen}>MakingLunch</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthSagaActions.GET_USER_DATA_WITH_TOKEN })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialScreen);