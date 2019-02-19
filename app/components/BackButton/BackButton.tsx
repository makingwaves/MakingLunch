import Image from 'react-native-remote-svg';
import { AlignItemsProperty } from 'csstype';
import { NavigationScreenProps } from 'react-navigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { memo, FunctionComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './style';

interface BackButtonProps extends NavigationScreenProps {
    screenTitle?: string;
    backgroundColor?: string;
    alignmentHorizontal?: AlignItemsProperty;
}

const backButton = require('./assets/backArrow.png');

const BackButton: FunctionComponent<BackButtonProps> = ({
    navigation, children, backgroundColor = 'transparent', alignmentHorizontal = 'center', screenTitle = null
}) => (
        <View style={[styles.container, { backgroundColor: backgroundColor, justifyContent: alignmentHorizontal }]}>
            <TouchableOpacity style={styles.imageStyles} onPress={() => { navigation.goBack(); }}>
                <Image
                    source={backButton}
                    style={{ width: wp('8%'), height: wp('8%') }}
                />
            </TouchableOpacity>
            {screenTitle && <Text style={styles.screenTitle}>{screenTitle}</Text>}
            {children}
        </View>
    );

export default memo(BackButton);
