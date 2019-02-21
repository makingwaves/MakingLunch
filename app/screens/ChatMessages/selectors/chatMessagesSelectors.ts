import dayjs, { Dayjs } from 'dayjs';
import { createSelector } from 'reselect';

import { AppState } from '@app/state/state';
import { ChatProps } from '../ChatMessages';
import { Message, Chat } from '@app/state/lunches/types';

const getLunch = (state: AppState, props: ChatProps) => state.lunches.data[props.navigation.getParam('lunch').id];
const getLunchChat = (state: AppState, props: ChatProps) => state.lunches.data[props.navigation.getParam('lunch').id].chat;

const getChatMessages = (chatMessages: Chat): Message[] => {
    return chatMessages && Object.keys(chatMessages)
        .reduce((messagesArray, key) => (messagesArray.push(chatMessages[key]), messagesArray), [])
        .sort((a, b) =>
            sortByTime(dayjs(a.time), dayjs(b.time))
        );
};
const sortByTime = (aTime: Dayjs, bTime: Dayjs): number => {
    if (aTime.isBefore(bTime))
        return 1;
    if (aTime.isAfter(bTime))
        return -1;
    return 0;
}

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
    getLunchChat,
    (lunch, chat) => ({
        id: getId(lunch.id),
        members: getMembers(lunch.members),
        chatMessages: getChatMessages(chat),
        lunchDate: getLunchData(dayjs(lunch.times[lunch.id].begin))
    })
);