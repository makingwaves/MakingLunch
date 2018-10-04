import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const InfoBar = (props: any) =>  {
    const { value } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nº of meetings</Text>
            <View style={styles.counterContainer}>
                <Text style={styles.counter}>{value}</Text>
            </View>
        </View>
    );
};

export default InfoBar;
