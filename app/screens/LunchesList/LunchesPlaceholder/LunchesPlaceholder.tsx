import Placeholder from 'rn-placeholder';
import { View, Text } from 'react-native';
import React, { FunctionComponent } from 'react';

import styles from './style';

const LunchesPlaceholder: FunctionComponent = ({ }) => {
    return (
        <View style={styles.placeholderContainer}>
            <Text style={[styles.sectionTitle]}></Text>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.displayTopBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.displayTopBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.displayTopBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
        </View>
    )
};

//https://github.com/mfrachet/rn-placeholder/issues/68
export default (Placeholder.connect as any)(LunchesPlaceholder);
