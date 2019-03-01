import React, { FunctionComponent, memo } from 'react'
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';

import UserImage from '@app/components/UserImage';
import { MessageSubTypeProps } from '../MessageType/MessageType';
import Triangle, { triangleSides } from '@app/components/Triangle/Triangle';

const OtherUserMessage: FunctionComponent<MessageSubTypeProps> = ({
    singleMessage, userId
}) => {
    return (
        <View style={styles.messageContainer}>
            <View style={styles.messageBlock}>
                <Text style={styles.messageText}>{singleMessage.message}</Text>
                <Triangle triangleSide={triangleSides.bottomLeft} size={wp('4%')} />
            </View>
            <UserImage userId={userId} imageContainerStyles={styles.imageContainerStyles} imageStyles={styles.imageStyles} />
        </View>
    );
}

export default memo(OtherUserMessage);