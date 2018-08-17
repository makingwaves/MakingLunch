import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { fontSizes } from '../../config/styles';

export interface BubbleProps {
    readonly title: string;
    readonly text: string;
    readonly bigTitle?: boolean;
    readonly color?: string;
}

const Bubble: React.SFC<BubbleProps> = props => {
    return (
        <View style={[styles.container, { backgroundColor: props.color }]}>
            <Text style={[styles.title, { fontSize: props.bigTitle ? fontSizes.zetta : fontSizes.peta }]}>
                {props.title}
            </Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

Bubble.defaultProps = {
    color: '#5b4663',
    bigTitle: false
};

export default Bubble;
