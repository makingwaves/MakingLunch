import Placeholder from 'rn-placeholder';
import { View, Text } from 'react-native';
import React, { FunctionComponent } from 'react';

import styles from './style';

const LunchesPlaceholder: FunctionComponent = ({ }) => {
    return (
        <View style={styles.placeholderContainer}>
            <View>
                <Text style={[styles.sectionTitle, styles.sectionTitleStyles]}></Text>
            </View>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.topBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.topBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
            <View style={styles.singleLunchContainer}>
                <View style={[styles.topBar, styles.topBarStyles]}>
                </View>
                <View style={[styles.bottomBar, styles.bottomBarStyles]}>
                </View>
            </View>
        </View>
    )
};

export default (Placeholder.connect as any)(LunchesPlaceholder);
