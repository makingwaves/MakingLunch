import React, { ReactElement, PureComponent, RefObject, createRef } from 'react'
import { ListRenderItem, FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import { Message } from '../../../state/lunches/types';
import { AppState } from './../../../state/state';
import CurrentUserMessage from './CurrentUserMessage';
import OtherUserMessage from './OtherUserMessage';
import MessagesLoader from './MessagesLoader';

export interface MessagesProps {
    messages: Message[];
    userId: string;
    refreshing: boolean;
};

export interface MessageTypeProps {
    singleMessage: Message;
    userId: string;
};

export enum UserMessageType {
    otherUser, currentUser
};

export type MessageType = { [key in UserMessageType]: (singleMessage: Message, userId: string) => ReactElement<MessageTypeProps> };

class Messages extends PureComponent<MessagesProps> {
    private flatListRef: RefObject<FlatList<Message>>;

    constructor(props: MessagesProps) {
        super(props);

        this.flatListRef = createRef();
    }

    private messageType: MessageType = {
        [UserMessageType.otherUser]: (singleMessage, userId) => <OtherUserMessage singleMessage={singleMessage} userId={userId} />,
        [UserMessageType.currentUser]: (singleMessage, userId) => <CurrentUserMessage singleMessage={singleMessage} userId={userId} />
    };

    private renderMessageItem: ListRenderItem<Message> = ({ item }) => {
        const isCurrentUser: number = Number(item.memberId === this.props.userId);
        return item && this.messageType[isCurrentUser](item, item.memberId);
    };

    private keyExtractor = (item: Message, index: number): string => item.messageId;
    
    public render() {
        const {
            messages,
            refreshing
        } = this.props;

        return (
            <FlatList
                style={styles.messagesViewContainer}
                data={messages}
                renderItem={this.renderMessageItem}
                keyExtractor={this.keyExtractor}
                inverted={true}
                ListHeaderComponent={<View style={styles.headerFlatList}></View>}
                ListFooterComponent={<MessagesLoader isLoading={refreshing} />} 
            />
        );
    }
}


const mapStateToProps = (state: AppState) => ({
    userId: state.auth.profile.id
});

export default connect(
    mapStateToProps
)(Messages);