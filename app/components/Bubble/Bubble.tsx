import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

export interface BubbleProps {
    title: string;
    text: string;
    color: string;
    // iconContainerColor: string;
    // onPress: () => any;
    // type: string;
}

const Bubble: React.SFC<BubbleProps> = props => {
    return (
        <View style={[styles.container, { backgroundColor: props.color }]}>
            <Text style={styles.title}>Let's get started now</Text>
            <Text style={styles.text}>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</Text>
        </View>
    );
};

Bubble.defaultProps = {
    color: '#5b4663'
};

export default Bubble;
