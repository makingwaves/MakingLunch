import { createSelector } from 'reselect';
import dayjs, { Dayjs } from 'dayjs';

import { AppState } from '../../../state/state';
import { ChatProps } from '../ChatMessages';
import { Chat, Message } from '../../../state/lunches/types';



const getLunch = (state: AppState, props: ChatProps) => state.lunches.data[props.navigation.getParam('lunch').id];

const getChatMessages = (chatMessages: Chat): Message[] => {
    return chatMessages && Object.keys(chatMessages)
        .reduce((messagesArray, key) => (messagesArray.push(chatMessages[key]), messagesArray), [])
        .sort((a, b) => a.time > b.time ? 1 : a.time < b.time ? -1 : 0);
};

const getMembers = (members: string[]): string[] => members;

const getId = (id: string): string => id;

const getLunchData = (dayjsDate: Dayjs): { date: string, hour: string } => {
    return {
        date: dayjsDate.format('YYYY.MM.DD'),
        hour: dayjsDate.format('HH:mm')
    }
};

export const mapLunchData = createSelector(
    getLunch,
    lunch => ({
        id: getId(lunch.id),
        members: getMembers(lunch.members),
        chatMessages: getChatMessages(lunch.chat),
        lunchDate: getLunchData(dayjs(lunch.times[lunch.id].begin))
    })
);