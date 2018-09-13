import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';

const BackButton = (props: any) => {
    const { navigation } = props;
    return (

        <TouchableOpacity style={styles.container} onPress={()=> { navigation.goBack() }}>
                <View style={styles.triangle}></View>
                <View style={styles.square}></View>
        </TouchableOpacity>
    );
};

export default BackButton;
