import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import LunchInformation from './LunchInformation';
import Messages from './Messages';
import ChatMessageInput from './ChatMessageInput';
import { mapLunchData } from './selectors/chatMessagesSelectors';
import BackButton from '../../components/BackButton';
import { Message, LunchSagaActions } from '../../state/lunches/types';
import { colors } from '../../config/styles';
import { RequestState } from '../../state/common/types';
import HocFetchData from '../../components/HocFetchData';
import { AppState } from '../../state/state';

export interface ChatProps extends NavigationScreenProps {
    id: string;
    members: string[];
    chatMessages: Message[];
    lunchDate: { 
        date: string;
        hour: string;
    };
    getChatMessages: (lunchId: string) => void;
    sendMessage: (messageContent: string, lunchId: string) => void;
};

class ChatMessages extends Component<ChatProps> {
    public componentDidMount(): void {
        const {
            id,
            getChatMessages
        } = this.props;

        getChatMessages(id);
    }

    private onMessageSend = (messageContent: string): void => {
        this.props.sendMessage(messageContent, this.props.id);
    }

    public render() {
        const {
            members,
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
                    />
                </BackButton>
                <Messages 
                    messages={chatMessages}
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
    getChatMessages: (lunchId: string) => dispatch({ type: LunchSagaActions.GET_LUNCH_CHAT, lunchId }),
    sendMessage: (messageContent: string, lunchId: string) => dispatch({ type: LunchSagaActions.SEND_CHAT_MESSAGE, payload: { messageContent, lunchId } })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(ChatMessages, 'Fetching chat messages..'));
