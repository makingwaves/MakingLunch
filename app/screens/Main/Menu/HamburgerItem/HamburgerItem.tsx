import React, { FunctionComponent, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './style';
import ConditionalAnimation from '../../../../components/ConditionalAnimation';

export interface HamburgerItemProps {
    isClicked: boolean;
    onHamburgerClick: () => void;
};

const HamburgerItem: FunctionComponent<HamburgerItemProps> = ({
    isClicked, onHamburgerClick
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
