export enum AppMessageType {
    Information = 1,
    Warning,
    Error
};

export interface AppMessage {
    id: string,
    type: AppMessageType;
    title: string;
    message: string;
    duration: number | null;
};

export interface AppMessagesState {
    app_messages: AppMessage[];
}

export enum AppMessagesActions {
    SHOW_APP_MESSAGE = "@@general/show_error_message",
    HIDE_APP_MESSAGE = "@@general/hide_error_message"
};