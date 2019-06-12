export enum AppMessageType {
    Success = 1,
    Information,
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
    SHOW_APP_MESSAGE = "@@general/show_app_message",
    HIDE_APP_MESSAGE = "@@general/hide_app_message"
};