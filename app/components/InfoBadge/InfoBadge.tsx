import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export interface InfoBadgeProps {
    readonly infoText: string;
}

const InfoBadge: React.SFC<InfoBadgeProps> = (props) => (
    <View style={styles.container}>
        <Text style={styles.title}>{props.infoText}</Text>
        <Text style={styles.text}>try: test/test</Text>
    </View>
);

export default InfoBadge;
