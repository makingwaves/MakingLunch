import React, { FunctionComponent, memo } from 'react'
import { View, Text } from 'react-native';

import styles from './styles';

import GuestList from '../../../components/GuestList';

export interface LunchInformationProps {
    membersId: string[]
}

const LunchInformation: FunctionComponent<LunchInformationProps> = ({
    membersId
}) => {
    return (
        <View style={styles.lunchInformationContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>13.05.18</Text>
                <Text style={styles.hourText}>14:00</Text>
            </View>
            <GuestList guestsId={membersId} imageStyles={styles.imageStyles} />
        </View>
    );
};

export default memo(LunchInformation);