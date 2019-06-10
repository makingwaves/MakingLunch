import { GeneralState } from "./types"
import { AppState } from "../state"

export function getNetworkConnection(state: AppState): boolean {
    return state.general.network_connection_state;
}