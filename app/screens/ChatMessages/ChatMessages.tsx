import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';

import Messages from './Messages';
import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import { AppState } from '@app/state/state';
import { mapLunchData } from './selectors/chatMessagesSelectors';
import { RequestState } from '@app/state/common/types';
import ChatMessageInput from './ChatMessageInput';
import LunchInformation from './LunchInformation';
import { GetLunchChatData } from '@app/sagas/chatSaga/chatSaga';
import { Message, LunchSagaActions } from '@app/state/lunches/types';

export interface ChatProps extends NavigationScreenProps {
    id: string;
    members: string[];
    chatMessages: Message[];
    lunchDate: {
        date: string;
        hour: string;
    };
    isLoading: boolean;
    getChatMessages: (payload: GetLunchChatData) => void;
    sendMessage: (messageContent: string, lunchId: string) => void;
};

class ChatMessages extends Component<ChatProps> {
    private currentPage: number;

    constructor(props: ChatProps) {
        super(props);

        this.currentPage = 0;
    }

    public componentDidMount(): void {
        this.props.getChatMessages({ lunchId: this.props.id, currentPage: this.currentPage, lazyLoaded: false });
    }

    private onMessageSend = (messageContent: string): void => {
        this.props.sendMessage(messageContent, this.props.id);
    }

    private onGuestListClick = () => {
        this.props.navigation.navigate('GuestsSwiper', { membersId: this.props.members });
    };

    private lazyLoadChatMessages = () => {
        this.currentPage += 1;
        this.props.getChatMessages({ lunchId: this.props.id, currentPage: this.currentPage, lazyLoaded: true });
    }

    public render() {
        const {
            members,
            isLoading,
            lunchDate,
            navigation,
            chatMessages,
        } = this.props;

        return (
            <View style={styles.chatMessagesContainer}>
                <BackButton navigation={navigation} backgroundColor={colors.brandColorSecondary} alignmentHorizontal={'space-between'}>
                    <LunchInformation
                        membersId={members}
                        lunchDate={lunchDate}
                        onGuestListClick={this.onGuestListClick}
                    />
                </BackButton>
                <Messages
                    messages={chatMessages}
                    refreshing={isLoading}
                    onEndReach={this.lazyLoadChatMessages}
                />
                <ChatMessageInput
                    sendMessage={this.onMessageSend}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: ChatProps) => ({
    ...mapLunchData(state, ownProps),
    isLoading: state.lunches.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    getChatMessages: (payload: GetLunchChatData) => dispatch({ type: LunchSagaActions.GET_LUNCH_CHAT, payload }),
    sendMessage: (messageContent: string, lunchId: string) => dispatch({ type: LunchSagaActions.SEND_CHAT_MESSAGE, payload: { messageContent, lunchId } })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMessages);
