import React, { memo, FunctionComponent } from 'react'
import { TouchableOpacity, Image } from 'react-native';

import styles from './style';

export interface UserLocationProps {
    onClick: () => void;
};

const LOCATION = require('./img/location.png');

const UserLocation: FunctionComponent<UserLocationProps> = ({
    onClick
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Image source={LOCATION} style={styles.image}/>
        </TouchableOpacity>
    );
};

export default memo(UserLocation);
