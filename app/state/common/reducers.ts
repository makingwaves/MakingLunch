import { Action, AnyAction, Reducer } from 'redux';

export abstract class GenericReducer<S = any, A extends Action = AnyAction, T = any> {
    protected reducerMap: Map<T, Reducer<S, A>>;

    protected constructor(protected initialState: S) {
        this.reducerMap = new Map();
        this.initialState = initialState;
    }

    protected defaultReducer = (state: any, action: AnyAction) => state;

    public getReducerMap = () => this.reducerMap;
    public getInitialState = () => this.initialState;
}

export function createReducer<S = any, A extends Action = AnyAction, T = any>(reducerClass: GenericReducer<S, A, T>) {
    const reducerMap = reducerClass.getReducerMap();
    const initialState = reducerClass.getInitialState();

    return (state: S = initialState, action: A) => {
        if (reducerMap.has(action.type)) {
            reducerMap.get(action.type)(state, action);
        }
        return this.defaultReducer(state, action);
    };
}
