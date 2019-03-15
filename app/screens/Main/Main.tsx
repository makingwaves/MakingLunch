import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import styles from './style';

import Menu from './Menu';
import MainContent from './MainContent';
import { AuthSagaActions } from '@app/state/auth/types';
import { LunchSagaActions } from '@app/state/lunches/types';

export interface MainProps {
    getLunches: () => void;
    getUserProfile: () => void;
}

class Main extends Component<MainProps> {

    public componentDidMount(): void {
        this.props.getLunches();
        this.props.getUserProfile();
    }

    public render() {
        return (
            <View style={styles.mainContainer}>
                <Menu />
                <MainContent />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getLunches: () => dispatch({ type: LunchSagaActions.GET_LUNCHES }),
    getUserProfile: () => dispatch({ type: AuthSagaActions.GET_USER_DATA })
})

export default connect(
    null,
    mapDispatchToProps
)(Main);