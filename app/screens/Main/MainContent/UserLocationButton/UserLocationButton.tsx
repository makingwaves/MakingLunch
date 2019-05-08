import React, { FunctionComponent, memo } from 'react';

import styles from './style';
import { TouchableOpacity, Image } from 'react-native';

export interface UserLocationButtonProps {
    onClick: () => void;
};

const LOCATION_ICON = require('./img/my_location.png');

const UserLocationButton: FunctionComponent<UserLocationButtonProps> = ({
    onClick
}) => {
    return (
        <TouchableOpacity style={styles.locationButton} onPress={onClick}>
            <Image source={LOCATION_ICON} style={styles.locationImage} />
        </TouchableOpacity>
    )
};

export default memo(UserLocationButton);