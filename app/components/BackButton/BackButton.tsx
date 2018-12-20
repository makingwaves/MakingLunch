import React, { memo } from 'react';
import Image from 'react-native-remote-svg'; 
import { TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';

interface BackButtonProps extends NavigationScreenProps {
    backgroundColor?: string;
}

const backButton = require('./backArrow.svg');

const BackButton: React.SFC<BackButtonProps> = ({
    navigation, backgroundColor = 'transparent'
}) => (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Image
                source={backButton}
                style={{ width: wp('8%'), height: wp('8%')}}
            />
        </TouchableOpacity>
    </View>
);

export default memo(BackButton);
