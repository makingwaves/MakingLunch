import * as Animatable from 'react-native-animatable';
import React, { FunctionComponent, ReactElement, memo } from 'react';

import { Message } from '@app/state/lunches/types';
import OtherUserMessage from '../OtherUserMessage';
import CurrentUserMessage from '../CurrentUserMessage';
import { UserMessageType } from '../Messages';

export interface MessageSubTypeProps {
    singleMessage: Message;
    userId: string;
};

export type MessageType = { [key in UserMessageType]: (singleMessage: Message, userId: string) => ReactElement<MessageSubTypeProps> };

export interface MessageTypeProps {
    item: Message;
    userId: string;
};

Animatable.initializeRegistryWithDefinitions({
    slideFromRight: {
        0: {
            translateX: 20
        },
        1: {
            translateX: 0
        }
    },
    slideFromLeft: {
        0: {
            translateX: -20
        },
        1: {
            translateX: 0
        }
    }
});

const MessageType: FunctionComponent<MessageTypeProps> = ({
    item, userId
}) => {
    const messageType: MessageType = {
        [UserMessageType.otherUser]: (singleMessage, userId) => <OtherUserMessage key={singleMessage.messageId} singleMessage={singleMessage} userId={userId} />,
        [UserMessageType.currentUser]: (singleMessage, userId) => <CurrentUserMessage key={singleMessage.messageId} singleMessage={singleMessage} userId={userId} />
    };

    const isCurrentUser: number = Number(item.memberId === userId);

    return item && messageType[isCurrentUser](item, item.memberId)
};

export default memo(MessageType);