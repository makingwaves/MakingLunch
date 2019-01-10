import React, { FunctionComponent, memo } from 'react'
import { View, Text, TouchableOpacity } from "react-native";

import styles from './style';

import LunchDate from '../LunchDate';
import GuestList from '../../../components/GuestList';
import { Lunch, LunchStatus } from '../../../state/lunches/types';
import { navigationService } from '../../../services';

export interface SingleLunchProps {
    lunch: Lunch;
    subTitle: string;
};

const SingleLunch: FunctionComponent<SingleLunchProps> = ({
    lunch, subTitle
}) => {
    const date = lunch.times[lunch.id];
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


export default memo(SingleLunch);