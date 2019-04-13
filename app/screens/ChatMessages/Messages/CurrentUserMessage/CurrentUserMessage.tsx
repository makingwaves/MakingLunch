import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { FunctionComponent, memo } from 'react'

import styles from './style';

import UserImage from '@app/components/UserImage';
import { MessageStatus } from '@app/state/lunches/types';
import { MessageSubTypeProps } from '../MessageType/MessageType';
import Triangle, { triangleSides } from '@app/components/Triangle/Triangle';

const CurrentUserMessage: FunctionComponent<MessageSubTypeProps> = ({
    singleMessage, userId
}) => {
    const pendingStyles = singleMessage.status === MessageStatus.pending ? styles.pendingMessage : {};

    return (
        <View style={styles.messageContainer}>
            <View style={[styles.messageBlock, pendingStyles]}>
                <Text style={styles.messageText}>{singleMessage.message}</Text>
                <Triangle triangleSide={triangleSides.bottomRight} size={wp('4%')} />
            </View>
            <UserImage userId={userId} imageContainerStyles={[styles.imageContainerStyles, pendingStyles]} imageStyles={styles.imageStyles} />
        </View>
    )
}

export default memo(CurrentUserMessage);