import React, { FunctionComponent, memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './style';
import { colors } from '../../../../config/styles';

export interface MessagesLoaderProps {
    isLoading: boolean;
}; 

const MessagesLoader: FunctionComponent<MessagesLoaderProps> = ({
    isLoading
}) => {
    return (
        <View style={styles.loaderContainer}>
            {isLoading && (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator color={colors.brandColorPrimary} />
                </View> 
            )}
        </View>
    );
}

export default memo(MessagesLoader);
