import React, { FunctionComponent, memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';

import Bubble from '@app/components/Bubble';
import Avatar from '@app/components/Avatar';
import { Member } from '@app/state/members/types';
import { triangleSides } from '@app/components/Triangle/Triangle';

export interface GuestSwiperPageProps {
    member: Member;
};

const GuestSwiperPage: FunctionComponent<GuestSwiperPageProps> = ({
    member
}) => {
    return (
        <View style={styles.guestPageContainer}>
            <Avatar
                photo={member.photo}
                imageContainer={styles.imageContainer}
                imageStyles={styles.imageStyles}
                triangleSide={triangleSides.bottomRight}
                size={wp('10%')}
            />
            <Bubble bubbleContainerStyles={styles.bubbleContainer} bubbleStyles={[styles.bubble, styles.name]} triangleSide={triangleSides.bottomLeft}>
                <Text style={[styles.bubbleText, styles.nameText]}>{member.name}</Text>
            </Bubble>
            <Bubble bubbleContainerStyles={styles.bubbleContainer} bubbleStyles={[styles.bubble, styles.description]} triangleSide={triangleSides.bottomRight}>
                <ScrollView style={styles.descriptionView}>
                    <Text style={styles.bubbleText}>{member.description}</Text>
                </ScrollView>
            </Bubble>
            <Bubble bubbleContainerStyles={styles.meetingsContainer} bubbleStyles={styles.meetingsBubble}>
                <Text style={styles.meetingsText}>N0 of mettings</Text>
                <Text style={styles.meetingsNumber}>32</Text>
            </Bubble>
        </View>
    )
}

export default memo(GuestSwiperPage);

