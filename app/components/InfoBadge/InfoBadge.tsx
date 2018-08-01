import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export interface InfoBadgeProps {
    infoText: string;
}

const InfoBadge: React.SFC<InfoBadgeProps> = props => (
    <View style={styles.container}>
        <Text>{props.infoText}</Text>
    </View>
);

export default InfoBadge;
