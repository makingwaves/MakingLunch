import React, { FunctionComponent, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './style';

export interface HamburgerItemProps {
    onHamburgerClick: () => void;
};

const HamburgerItem: FunctionComponent<HamburgerItemProps> = ({
    onHamburgerClick
}) => {
    return (
        <TouchableOpacity
            onPress={onHamburgerClick}
            style={styles.hamburgerContainer}
        >
            <View style={styles.beams}></View>
            <View style={styles.beams}></View>
            <View style={styles.beams}></View>
        </TouchableOpacity>
    );
};

export default memo(HamburgerItem);
