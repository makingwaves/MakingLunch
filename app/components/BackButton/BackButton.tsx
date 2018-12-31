import React, { memo } from 'react';
import Image from 'react-native-remote-svg'; 
import { TouchableOpacity, View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';

interface BackButtonProps extends NavigationScreenProps {
    screenTitle?: string;
    backgroundColor?: string;
}

const backButton = require('./backArrow.svg');

const BackButton: React.SFC<BackButtonProps> = ({
    navigation, backgroundColor = 'transparent', screenTitle = null
}) => (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <TouchableOpacity style={styles.imageStyles} onPress={() => { navigation.goBack(); }}>
            <Image
                source={backButton}
                style={{ width: wp('8%'), height: wp('8%')}}
            />
        </TouchableOpacity>
        {screenTitle && <Text style={styles.screenTitle}>{screenTitle}</Text>}
    </View>
);

export default memo(BackButton);
