import React, { FunctionComponent, memo, ReactElement } from 'react'
import { View, FlatList, ListRenderItem } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import { Chat, Message } from '../../../state/lunches/types';
import { AppState } from './../../../state/state';
import CurrentUserMessage from './CurrentUserMessage';
import OtherUserMessage from './OtherUserMessage';

export interface MessagesProps {
    messages: Chat;
    userId: string;
};

export interface MessageTypeProps {
    singleMessage: Message;
    userId: string;
};

export enum UserMessageType {
    otherUser, currentUser
};

export type MessageType = { [key in UserMessageType]: (singleMessage: Message, userId: string) => ReactElement<MessageTypeProps> };

const Messages: FunctionComponent<MessagesProps> = ({
    messages, userId
}) => {
    const messageType: MessageType = {
        [UserMessageType.otherUser]: (singleMessage, userId) => <OtherUserMessage singleMessage={singleMessage} userId={userId} />,
        [UserMessageType.currentUser]: (singleMessage, userId) => <CurrentUserMessage singleMessage={singleMessage} userId={userId} />
    };
    const FlatListFooter: ReactElement<Element> = <View style={{ marginBottom: 50 }}></View>;

    const getArrayFromChatMessages = (): Message[] => {
        return messages && Object.keys(messages)
            .reduce((messagesArray, key) => (messagesArray.push(messages[key]), messagesArray), [] as Message[])
            .sort((a, b) => a.time > b.time ? 1 : a.time < b.time ? -1 : 0);
    }

    const renderMessageItem: ListRenderItem<Message> = ({ item }) => {
        const isCurrentUser: number = Number(item.memberId === userId);
        return item && messageType[isCurrentUser](item, userId);
    };

    const keyExtractor = (item: Message, index: number): string => item.messageId;

    return (
        <FlatList style={styles.messagesViewContainer}
            data={getArrayFromChatMessages()}
            renderItem={renderMessageItem}
            keyExtractor={keyExtractor}
            ListFooterComponent={FlatListFooter}
        />
    );
}

const mapStateToProps = (state: AppState) => ({
    userId: state.auth.profile.id
});

export default connect(
    mapStateToProps
)(memo(Messages));