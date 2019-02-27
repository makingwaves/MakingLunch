import React, { memo, FunctionComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './style';
import { colors } from '@app/config/styles';

export interface LoaderProps {
    isVisible: boolean;
    indicatorColor?: string;
};

const Loader: FunctionComponent<LoaderProps> = ({
    isVisible, indicatorColor = colors.colorLightest
}) => {
    return isVisible && (
        <View style={styles.container}>
            <ActivityIndicator color={indicatorColor} size={'large'} />
        </View>
    );
}

export default memo(Loader);