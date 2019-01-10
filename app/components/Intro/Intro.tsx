import React, { FunctionComponent, memo } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

import { fontSizes } from '../../config/styles';

export interface IntroProps {
    readonly title: string;
    readonly text: string;
    readonly isTitleLarge?: boolean;
}

const Intro: FunctionComponent<IntroProps> = ({
    title, text, children, isTitleLarge = false
}) => {
    return (
        <View>
            {children}
            <Text style={[styles.title, { fontSize: isTitleLarge ? fontSizes.zetta : fontSizes.peta }]}>
                {title}
            </Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default memo(Intro);
