import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

interface InfoBarProps {
    value: number;
}

const InfoBar = (props: InfoBarProps) =>  {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nº of meetings</Text>
            <View style={styles.counterContainer}>
                <Text style={styles.counter}>{props.value}</Text>
            </View>
        </View>
    );
};

export default InfoBar;
