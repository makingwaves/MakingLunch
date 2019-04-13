import { ActivityIndicator, View } from 'react-native';
import React, { FunctionComponent, memo } from 'react';

import styles from './style';
import { colors } from '@app/config/styles';

const WaitingFotData: FunctionComponent = ({

}) => {
    return (
        <View style={styles.waitingContainer}>
            <ActivityIndicator color={colors.brandColorPrimary} />
        </View>
    );
}




export default memo(WaitingFotData);