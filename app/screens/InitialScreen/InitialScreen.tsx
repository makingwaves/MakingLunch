import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import styles from './style';

import { AppState } from '../../state/state';
import { Profile, AuthSagaActions } from '../../state/auth/types';

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
        if(prevProps.userData !== this.props.userData) {
            this.props.navigation.navigate(
                this.isUserLogged(this.props.userData) ? 'App' : 'Auth'
            );
        }
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