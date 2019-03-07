import dayjs from 'dayjs';
import { View, Image, Text } from 'react-native';
import React, { FunctionComponent, memo } from 'react';

import styles from './style';

import Bubble from '@app/components/Bubble';
import { Lunch } from '@app/state/lunches/types';
import { triangleSides } from '@app/components/Triangle/Triangle';
import GuestList from '@app/components/GuestList';
import CustomButton from '@app/components/CustomButton';
import { navigationService } from '@app/services';

export interface LunchAssignedProps {
    runningLunch: Lunch;
};

const CLOCK = require('./assets/clock.png');
const START_CHAT = require('./assets/chat.png');

const LunchAssigned: FunctionComponent<LunchAssignedProps> = ({
    runningLunch
}) => {
    const redirectToChat = () => {
        navigationService.navigate('Chat', { lunch: runningLunch })
    }

    const date = runningLunch.times[runningLunch.id];

    return (
        <View>
            <Bubble bubbleContainerStyles={styles.dateBubbleContainer} bubbleStyles={styles.dateBubble} triangleSide={triangleSides.bottomRight}>
                <View style={styles.dateView}>
                    <Image source={CLOCK} style={styles.dateImage} />
                    <Text style={styles.dateText}>{dayjs(date.begin).format('DD.MM.YY')}</Text>
                </View>
                <Text style={styles.hourText}>{dayjs(date.begin).format('HH:mm')}</Text>
            </Bubble>
            <Bubble bubbleContainerStyles={styles.guestBubbleContainer} bubbleStyles={styles.guestBubble} triangleSide={triangleSides.bottomLeft}>
                <GuestList guestListContainerStyles={styles.guestListContainer} imageStyles={styles.guestImage} imageContainerStyles={styles.guestImageContainer} guestsId={runningLunch.members} />
            </Bubble>
            <CustomButton
                text={'Start chat'}
                onPress={redirectToChat}
                triangleSide={triangleSides.bottomRight}
                containerStyles={styles.buttonContainer}
                buttonStyles={styles.buttonStyles}
                activeOpacity={.8}
                textButtonStyles={styles.textButtonStyles}
            >
                <Image source={START_CHAT} />
            </CustomButton>
        </View>
    );
}

export default memo(LunchAssigned);