import { connect } from 'react-redux';
import { ListRenderItem, FlatList, View } from 'react-native';
import React, { ReactElement, PureComponent } from 'react'

import styles from './style';

import { Message } from '@app/state/lunches/types';
import { AppState } from '@app/state/state';
import MessagesLoader from './MessagesLoader';
import OtherUserMessage from './OtherUserMessage';
import CurrentUserMessage from './CurrentUserMessage';

export interface MessagesProps {
    userId: string;
    messages: Message[];
    refreshing: boolean;
    onEndReach: () => void;
};

export interface MessagesState {
    performLazyLoad: boolean;
};

export interface MessageTypeProps {
    singleMessage: Message;
    userId: string;
};

export enum UserMessageType {
    otherUser, currentUser
};

export type MessageType = { [key in UserMessageType]: (singleMessage: Message, userId: string) => ReactElement<MessageTypeProps> };

class Messages extends PureComponent<MessagesProps, MessagesState> {
    public state: MessagesState;

    private messageType: MessageType = {
        [UserMessageType.otherUser]: (singleMessage, userId) => <OtherUserMessage singleMessage={singleMessage} userId={userId} />,
        [UserMessageType.currentUser]: (singleMessage, userId) => <CurrentUserMessage singleMessage={singleMessage} userId={userId} />
    };

    constructor(props: MessagesProps) {
        super(props);

        this.state = {
            performLazyLoad: true
        };
    }

    public componentDidUpdate(prevProps: MessagesProps): void {
        if (prevProps.messages !== this.props.messages
            && (prevProps.messages.length === this.props.messages.length || this.props.messages.length < 16))
            this.setState(prevState => ({ performLazyLoad: false }));
    }

    private renderMessageItem: ListRenderItem<Message> = ({ item }) => {
        const isCurrentUser: number = Number(item.memberId === this.props.userId);
        return item && this.messageType[isCurrentUser](item, item.memberId);
    };

    private keyExtractor = (item: Message, index: number): string => item.messageId;

    private onEndReach = () => {
        if (!this.props.refreshing && this.state.performLazyLoad)
            this.props.onEndReach();
    }

    public render() {
        const {
            messages,
            refreshing
        } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.messagesViewContainer}
                    data={messages}
                    renderItem={this.renderMessageItem}
                    keyExtractor={this.keyExtractor}
                    inverted={true}
                    onEndReached={this.onEndReach}
                    onEndReachedThreshold={.2}
                    ListHeaderComponent={<View style={styles.headerFlatList}></View>}
                    ListFooterComponent={<MessagesLoader isLoading={refreshing} />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userId: state.auth.profile.id
});

export default connect(
    mapStateToProps
)(Messages);