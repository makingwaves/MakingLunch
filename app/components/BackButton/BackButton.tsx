import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Image from 'react-native-remote-svg';
import {NavigationScreenProps} from "react-navigation";

const BackButton = (props: NavigationScreenProps) => {
    const { navigation } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => { navigation.goBack(); }}>
            <Image
                source={require('./backArrow.svg')}
                style={{ width: wp('10%'), height: wp('10%')}}
            />
        </TouchableOpacity>
    );
};

export default BackButton;
