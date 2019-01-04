import React, { memo, ReactText, FunctionComponent } from 'react';
import { View, Text, TextInput, StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';

import Triangle, { triangleSides } from '../Triangle/Triangle';

export interface InputProps {
    readonly title: string;
    readonly value: string;
    readonly onChangeText: (text: string) => any;
    readonly placeholder?: string;
    readonly secureTextEntry?: boolean;
}

export interface CustomInputProps {
    readonly label: string;
    readonly value: string;
    readonly onChangeText: (text: string, type: string) => void; 
    readonly type: string;
    readonly placeholder?: string;
    readonly triangleSide?: triangleSides;
    readonly size?: number;
    readonly containerStyles?: StyleProp<ViewStyle>;
    readonly inputStyles?: StyleProp<ViewStyle>;
};

const CustomInput: FunctionComponent<CustomInputProps> = ({
    label, value, type, onChangeText, triangleSide, size = wp('8%'), placeholder = '', containerStyles = {}, inputStyles = {}
}) => (
    <View style={[styles.container, containerStyles]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
            style={[styles.input, inputStyles]}
            value={value}
            onChangeText={(text) => onChangeText(text, type)}
            placeholder={placeholder}
        />
        {triangleSide && <Triangle size={size} triangleSide={triangleSide}/>}
    </View>
);

export default memo(CustomInput);
