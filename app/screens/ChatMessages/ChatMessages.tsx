import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { colors } from '../../config/styles';

import { Lunch, LunchSagaActions } from '../../state/lunches/types';
import BackButton from '../../components/BackButton';
import { AppState } from '../../state/state';
import { RequestState } from '../../state/common/types';
import HocFetchData from '../../components/HocFetchData';
import LunchInformation from './LunchInformation';
import Messages from './Messages';
import ChatMessageInput from './ChatMessageInput';

export interface ChatProps extends NavigationScreenProps {
    lunch: Lunch;
    getChatMessages: (lunchId: string) => void;
};

class ChatMessages extends Component<ChatProps> {
    public componentDidMount(): void {
        const {
            lunch,
            getChatMessages
        } = this.props;

        getChatMessages(lunch.id);
    }

    public render() {
        const {
            lunch,
            navigation
        } = this.props;

        return (
            <View style={styles.chatMessagesContainer}>
                <BackButton navigation={navigation} backgroundColor={colors.brandColorSecondary} >
                    <LunchInformation 
                        membersId={lunch.members} 
                    />
                </BackButton>
                <Messages 
                    messages={lunch.chat}
                />
                <ChatMessageInput />
        </View>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: ChatProps) => ({
    lunch: state.lunches.data[ownProps.navigation.getParam('lunch').id],
    isLoading: state.lunches.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    getChatMessages: (lunchId: string) => dispatch({ type: LunchSagaActions.GET_LUNCH_CHAT, lunchId })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(ChatMessages, 'Fetching chat messages..'));
