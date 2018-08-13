import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';

export interface InputProps {
    readonly title: string;
    readonly value: string;
    readonly placeholder: string;
    readonly onChangeText: (text: string) => any;
}

const Input: React.SFC<InputProps> = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                style={styles.input}
                {...props}
            />
        </View>
    );
};

export default Input;
