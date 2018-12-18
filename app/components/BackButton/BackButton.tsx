import React from 'react';
import Image from 'react-native-remote-svg'; 
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {NavigationScreenProps} from 'react-navigation';

import styles from './style';

const BackButton = (props: NavigationScreenProps) => {
    const { navigation } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => { navigation.goBack(); }}>
            <Image
                source={require('./backArrow.svg')}
                style={{ width: wp('8%'), height: wp('8%')}}
            />
        </TouchableOpacity>
    );
};

export default BackButton;
