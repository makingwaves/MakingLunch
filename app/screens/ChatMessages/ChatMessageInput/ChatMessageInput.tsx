import React, { PureComponent } from 'react';
import { View } from 'react-native';

import styles from './style';

import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';

export interface ChatMessageInputProps {

};

export interface ChatMessageInputState {
    chatMessage: string;
};

class ChatMessageInput extends PureComponent<ChatMessageInputProps, ChatMessageInputState> {
    public state: ChatMessageInputState;

    constructor(props: ChatMessageInputProps) {
        super(props);

        this.state = {
            chatMessage: ''
        };
    }

    private onSendClick = () => {
        this.setState(prevState => ({ chatMessage: '' }));
    };

    private onMessageInputChange = (chatMessage: string) => {
        this.setState(prevState => ({ chatMessage }));
    };

    public render() {
        const {
            chatMessage
        } = this.state;

        return (
            <View style={styles.chatMessagesContainer}>
                <CustomInput 
                    value={chatMessage}
                    type={'text'}
                    onChangeText={this.onMessageInputChange}
                    containerStyles={styles.inputContainerStyles}
                    inputStyles={styles.inputStyles}
                    placeholder={'Type message here..'}
                />
                <CustomButton 
                    text={'Send'}
                    onPress={this.onSendClick}
                    containerStyles={styles.buttonContainerStyles}
                    buttonStyles={styles.buttonViewContainerStyles}
                />
            </View>
        );
    }
}

export default ChatMessageInput;