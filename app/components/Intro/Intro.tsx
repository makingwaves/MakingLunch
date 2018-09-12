import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { fontSizes } from '../../config/styles';

export interface BubbleProps {
    readonly title: string;
    readonly text: string;
    readonly bigTitle?: boolean;
    readonly color?: string;
}

const Intro: React.SFC<BubbleProps> = props => {
    return (
        <View>
            {props.children}
            <Text style={[styles.title, { fontSize: props.bigTitle ? fontSizes.zetta : fontSizes.peta }]}>
                {props.title}
            </Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

Intro.defaultProps = {
    bigTitle: false
};


export default Intro;