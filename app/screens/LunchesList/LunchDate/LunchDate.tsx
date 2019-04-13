import dayjs from 'dayjs';
import { View, Image, Text } from "react-native";
import React, { FunctionComponent } from "react";

import styles from './styles';

export interface LunchDataProps {
    isActive: boolean,
    date: {
        begin: string;
        end: string;
    };
}

const CLOCK = require('./img/clock.png');

const LunchDate: FunctionComponent<LunchDataProps> = ({
    isActive, date
}) => {
    const getLargeDataText = (isActive: boolean) => {
        if (isActive)
            return (
                <Text style={styles.activeLargeDataText}>
                    {dayjs(date.begin).format('HH:mm')} - {dayjs(date.end).format('HH:mm')}
                </Text>
            );
        return (
            <Text style={styles.largeDateText}>
                {dayjs(date.begin).format('HH:mm')}
            </Text>
        );
    };

    return (
        <View style={styles.lunchDateContainer}>
            <View style={styles.upperDate}>
                <Image source={CLOCK} style={styles.clockImage} />
                <Text style={styles.miniDateText}>{dayjs(date.begin).format('DD.MM.YY')}</Text>
            </View>
            <View>
                {getLargeDataText(isActive)}
            </View>
        </View>
    )
};

export default LunchDate;