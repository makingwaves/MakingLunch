import React, { FunctionComponent, memo } from 'react'
import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";

import styles from './style';
import { colors } from "@app/config/styles";

import Display from '@app/components/Display';
import LunchDate from '../LunchDate';
import GuestList from '@app/components/GuestList';
import { navigationService } from '@app/services';
import { LunchStatus, Lunch } from '@app/state/lunches/types';

export interface SingleLunchProps {
    lunch: Lunch;
    userId: string;
    subTitle: string;
    cancelMeeting: (lunchId: string) => void;
};

const DELETE = require('./assets/delete.png');

const SingleLunch: FunctionComponent<SingleLunchProps> = ({
    lunch, subTitle, userId, cancelMeeting
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

    const onDeleteClick = (): void => {
        Alert.alert(
            'Cancel pending lunch',
            'Are you sure you want to cancel this lunch?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', onPress: () => cancelMeeting(lunch.id) }
            ]
        );
    }

    return (
        <TouchableOpacity style={styles.singleLunchContainer} onPress={onLunchClick}>
            <View style={styles.displayTopBar}>
                <Display enable={lunch.isCancelling} style={styles.topBar} enter={'fadeIn'} exit={'fadeOut'} defaultDuration={300}>
                    <View style={styles.cancellingContainer}>
                        <ActivityIndicator color={colors.brandColorSecondary} />
                    </View>
                </Display>
                <Display enable={!lunch.isCancelling} style={styles.topBar} enter={'fadeIn'} exit={'fadeOut'} defaultDuration={300}>
                    <LunchDate isActive={isActive} date={date} />
                    <GuestList guestsId={lunch.members} imageContainerStyles={styles.imageContainerStyles} />
                </Display>
            </View>
            <View style={[styles.bottomBar, isActive ? styles.activeBottomBar : {}]}>
                {(isActive && !lunch.isCancelling) && (
                    <TouchableOpacity onPress={onDeleteClick} style={styles.deleteIconContainer} >
                        <Image source={DELETE} style={styles.deleteIcon} />
                    </TouchableOpacity>
                )}
                <Text style={styles.bottomBarText}>{lunch.isCancelling ? 'Cancelling' : subTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}


export default memo(SingleLunch);