import { ActivityIndicator } from 'react-native';
import React, { memo, FunctionComponent } from 'react';

import styles from './style';

import Display from '../Display';
import { colors } from '@app/config/styles';

export interface LoaderProps {
    isVisible: boolean;
    indicatorColor?: string;
};

const Loader: FunctionComponent<LoaderProps> = ({
    isVisible, indicatorColor = colors.colorLightest
}) => {
    if (!isVisible)
        return null;

    return (
        <Display style={styles.container} enable={isVisible} enter={'fadeIn'} exit={null} defaultDuration={300}>
            <ActivityIndicator color={indicatorColor} size={'large'} />
        </Display>
    )
}

export default memo(Loader);