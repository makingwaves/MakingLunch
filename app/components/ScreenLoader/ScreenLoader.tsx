import Display from 'react-native-display';
import { ActivityIndicator } from 'react-native';
import React, { memo, FunctionComponent } from 'react';

import styles from './style';
import { colors } from '@app/config/styles';

export interface LoaderProps {
    isVisible: boolean;
    indicatorColor?: string;
};

const Loader: FunctionComponent<LoaderProps> = ({
    isVisible, indicatorColor = colors.colorLightest
}) => {
    return (
        <Display style={styles.container} enable={isVisible} enter={'fadeIn'} exit={'flipOutY'} defaultDuration={300}>
            <ActivityIndicator color={indicatorColor} size={'large'} />
        </Display>
    )
}

export default memo(Loader);