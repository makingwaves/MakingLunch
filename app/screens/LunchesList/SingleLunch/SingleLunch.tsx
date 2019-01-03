import React, { SFC } from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

import styles from './style';

import GuestList from '../GuestList';
import LunchDate from '../LunchDate';
import { Lunch, LunchStatus } from '../../../state/lunches/types';
import { AppState } from './../../../state/state';
import { navigationService } from '../../../services';

export interface SingleLunchProps {
    lunch: Lunch;
    userId: string;
    subTitle: string;
};

const SingleLunch: SFC<SingleLunchProps> = ({
    lunch, userId, subTitle
}) => {
    const date = lunch.times[userId];
    const isActive = lunch.status === LunchStatus.running;

    return (
        <TouchableOpacity style={styles.singleLunchContainer} onPress={() => navigationService.navigate('Chat', { lunch })}>
            <View style={styles.topBar}>
                <LunchDate isActive={isActive} date={date} />
                <GuestList guestsId={lunch.members} />
            </View>
            <View style={[styles.bottomBar, isActive ? styles.activeBottomBar : {}]}>
                <Text style={styles.bottomBarText}>{subTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const mapStateToProps = (state: AppState) => ({
    userId: state.auth.profile.id
});

export default connect(
    mapStateToProps
)(SingleLunch);