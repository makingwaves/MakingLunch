import React, { FunctionComponent, memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import GuestList from '../../../components/GuestList';

export interface LunchInformationProps {
    membersId: string[];
    lunchDate: {
        date: string;
        hour: string;
    };
    onGuestListClick: () => void;
}

const LunchInformation: FunctionComponent<LunchInformationProps> = ({
    membersId, lunchDate, onGuestListClick
}) => {
    return (
        <View style={styles.lunchInformationContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{lunchDate.date}</Text>
                <Text style={styles.hourText}>{lunchDate.hour}</Text>
            </View>
            <TouchableOpacity onPress={onGuestListClick}>
                <GuestList 
                    guestsId={membersId} 
                    imageStyles={styles.imageStyles} 
                    imageContainerStyles={styles.imageContainerStyles} 
                    guestListContainerStyles={styles.guestListContainerStyles}
                />
            </TouchableOpacity>
        </View>
    );
};

export default memo(LunchInformation);