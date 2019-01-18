import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import Placeholder from "rn-placeholder";

import styles from './style';

const LunchesPlaceholder: FunctionComponent = ({

}) => {
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

export default Placeholder.connect(LunchesPlaceholder);
