import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { FunctionComponent, memo } from 'react'

import styles from './style';

import LunchDate from '../LunchDate';
import GuestList from '@app/components/GuestList';
import { navigationService } from '@app/services';
import { LunchStatus, Lunch } from '@app/state/lunches/types';

export interface SingleLunchProps {
    lunch: Lunch;
    userId: string;
    subTitle: string;
};

const SingleLunch: FunctionComponent<SingleLunchProps> = ({
    lunch, subTitle, userId
}) => {
    const date = lunch.times[lunch.id] || lunch.times[userId];
    const isActive = lunch.status === LunchStatus.pending;

    const onLunchClick = (): void => {
        if (lunch.status !== LunchStatus.pending)
            navigationService.navigate('Chat', { lunch });
        else
            Alert.alert(
                'Pending lunch',
                'Cannot open pending chat screen',
                [
                    { text: 'Ok' }
                ]
            );
    }

    return (
        <TouchableOpacity style={styles.singleLunchContainer} onPress={onLunchClick}>
            <View style={styles.topBar}>
                <LunchDate isActive={isActive} date={date} />
                <GuestList guestsId={lunch.members} imageContainerStyles={styles.imageContainerStyles} />
            </View>
            <View style={[styles.bottomBar, isActive ? styles.activeBottomBar : {}]}>
                <Text style={styles.bottomBarText}>{subTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}


export default memo(SingleLunch);