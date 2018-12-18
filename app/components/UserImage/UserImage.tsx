import React, { memo } from 'react';
import { View, Image } from 'react-native';

import styles from './style';
import { borderRadius } from '../../config/styles';

import Bubble from '../Bubble/Bubble';
import { triangleSides } from '../Triangle/Triangle';

export interface UserImageProps {
    readonly imageUri: string;
};

const UserImage: React.SFC<UserImageProps> = ({ imageUri }) => (
    <Bubble
        baseBorderRadius={borderRadius.borderRadiusLarge}
        borderRadiusBottomRight={borderRadius.borderRadiusNone}
        triangleSide={triangleSides.bottomRight}
    >
        <View style={styles.imageContainer}>
            <View style={styles.fixedRatio}>
                <Image source={{uri: imageUri}} style={styles.image} resizeMode={'cover'} />
            </View>
        </View>
    </Bubble>
);

export default memo(UserImage);
