import { connect } from 'react-redux';
import React, { PureComponent } from 'react'
import { FlatList, View, ListRenderItem } from 'react-native';

import styles from './style';

import MessageType from './MessageType';
import { AppState } from '@app/state/state';
import MessagesLoader from './MessagesLoader';
import { Message, MessageStatus } from '@app/state/lunches/types';

export interface MessagesProps {
    userId: string;
    messages: Message[];
    refreshing: boolean;
    onEndReach: () => void;
};

export interface MessagesState {
    performLazyLoad: boolean;
};

export enum UserMessageType {
    otherUser, currentUser
};

class Messages extends PureComponent<MessagesProps, MessagesState> {
    public state: MessagesState;

    constructor(props: MessagesProps) {
        super(props);

        this.state = {
            performLazyLoad: true
        };
    }

    public componentDidUpdate(prevProps: MessagesProps): void {
        if (this.state.performLazyLoad && prevProps.messages !== this.props.messages
            && (prevProps.messages.length === this.props.messages.length || this.props.messages.length < 16))
            if (!this.prevPropsUpdatingStatus(prevProps.messages))
                this.setState(prevState => ({ performLazyLoad: false }));
    }

    private prevPropsUpdatingStatus(prevMessages: Message[]): boolean {
        return prevMessages && prevMessages
            .some(msg => msg.status === MessageStatus.pending);
    }

    private keyExtractor = (item: Message, index: number): string => item.messageId;

    private onEndReach = () => {
        if (!this.props.refreshing && this.state.performLazyLoad)
            this.props.onEndReach();
    }

    private renderItem: ListRenderItem<Message> = ({ item }) => <MessageType key={item.messageId} userId={this.props.userId} item={item} />;

    public render() {
        const {
            messages,
            refreshing
        } = this.props;

        return (
            <FlatList
                style={styles.messagesViewContainer}
                data={messages}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                inverted={true}
                onEndReached={this.onEndReach}
                onEndReachedThreshold={0.25}
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