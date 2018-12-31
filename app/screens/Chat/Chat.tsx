import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Text, View } from 'react-native';

import { colors } from '../../config/styles';

import { Lunch } from '../../state/lunches/types';
import BackButton from '../../components/BackButton';

export interface ChatProps extends NavigationScreenProps {
    lunch: Lunch
};

class Chat extends PureComponent<ChatProps> {
    constructor(props: ChatProps) {
        super(props);
    }

    public render() {
        const {
            lunch,
            navigation
        } = this.props;

        return (
            <View>
                <BackButton navigation={navigation} screenTitle={'Chat'} backgroundColor={colors.brandColorSecondary} />
            </View>
        );
    }
}

export default Chat;
