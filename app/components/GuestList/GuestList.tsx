import React, { FunctionComponent } from 'react'
import { View, StyleProp, ImageStyle } from 'react-native';

import styles from './style';

import UserImage from '../UserImage';

export interface GuestListProps {
    guestsId: string[],
    imageStyles?: StyleProp<ImageStyle>;
};

const GuestList: FunctionComponent<GuestListProps> = ({
    guestsId, imageStyles = {}
}) => {

    const getMembersPhoto = (guestsId: string[]) => {
        return [0, 1, 2]
            .map(index => <UserImage key={index} userId={guestsId[index]} imageStyles={imageStyles} />)
    };

    return (
        <View style={styles.guestListContainer}>
            {getMembersPhoto(guestsId)}
        </View>
    );
};

export default GuestList;