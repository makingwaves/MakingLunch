import React, { FunctionComponent, memo } from 'react'
import { View, Text } from 'react-native';

import styles from './styles';

import GuestList from '../../../components/GuestList';

export interface LunchInformationProps {
    membersId: string[];
    lunchDate: {
        date: string;
        hour: string;
    };
}

const LunchInformation: FunctionComponent<LunchInformationProps> = ({
    membersId, lunchDate
}) => {
    return (
        <View style={styles.lunchInformationContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{lunchDate.date}</Text>
                <Text style={styles.hourText}>{lunchDate.hour}</Text>
            </View>
            <GuestList 
                guestsId={membersId} 
                imageStyles={styles.imageStyles} 
                imageContainerStyles={styles.imageContainerStyles} 
                guestListContainerStyles={styles.guestListContainerStyles}
            />
        </View>
    );
};

export default memo(LunchInformation);