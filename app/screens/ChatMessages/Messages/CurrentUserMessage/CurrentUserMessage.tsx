import React, { FunctionComponent, memo } from 'react'
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';

import { MessageTypeProps } from '../Messages';
import Triangle, { triangleSides } from '../../../../components/Triangle/Triangle';
import UserImage from '../../../../components/UserImage';

const CurrentUserMessage: FunctionComponent<MessageTypeProps> = ({
    singleMessage, userId
}) => {
    return (
        <View style={styles.messageContainer}>
            <View style={styles.messageBlock}>
                <Text style={styles.messageText}>{singleMessage.message}</Text>
                <Triangle triangleSide={triangleSides.bottomRight} size={wp('4%')} />
            </View>
            <UserImage userId={userId} imageContainerStyles={styles.imageContainerStyles} imageStyles={styles.imageStyles} />
        </View>
    )
}

export default memo(CurrentUserMessage);