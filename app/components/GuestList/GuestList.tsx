import React, { FunctionComponent } from 'react'
import { View, StyleProp, ImageStyle, ViewStyle } from 'react-native';

import styles from './style';

import UserImage from '../UserImage';

export interface GuestListProps {
    guestsId: string[],
    imageStyles?: StyleProp<ImageStyle>;
    imageContainerStyles?: StyleProp<ImageStyle>;
    guestListContainerStyles?: StyleProp<ViewStyle>;
};

const GuestList: FunctionComponent<GuestListProps> = ({
    guestsId, imageStyles = {}, imageContainerStyles = {}, guestListContainerStyles = {}
}) => {

    const getMembersPhoto = (guestsId: string[]) => {
        return [0, 1, 2]
            .map(index => <UserImage key={index} userId={guestsId[index]} imageStyles={imageStyles} imageContainerStyles={imageContainerStyles} />)
    };

    return (
        <View style={[styles.guestListContainer, guestListContainerStyles]}>
            {getMembersPhoto(guestsId)}
        </View>
    );
};

export default GuestList;