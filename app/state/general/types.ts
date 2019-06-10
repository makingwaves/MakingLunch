export interface GeneralState {
    network_connection_state: boolean;
}

export enum GeneralActions {
    SET_NETWORK_CONNECTION_STATE = '@@general/set_network_connection_state'
};