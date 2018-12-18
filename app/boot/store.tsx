import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootReducer from '../state/state';
import sagas from '../sagas/sagas';

type Middlewares = SagaMiddleware<{}>;

function configureStore(middlewares: Middlewares[]) {
    // configure middlewares
    // const middlewares = [];
    // compose enhancers
    // const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    // create store
    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
}

const sagaMiddleware = createSagaMiddleware();

// pass an optional param to rehydrate state on app start
const store = configureStore([
    sagaMiddleware
]);

sagaMiddleware.run(sagas);

// export store singleton instance
export default store;
