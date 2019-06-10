import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import sagas from '@app/sagas/sagas';
import rootReducer from '@app/state/state';

type Middlewares = SagaMiddleware<{}>;


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function configureStore(middlewares: Middlewares[]) {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore([
    sagaMiddleware
]);

sagaMiddleware.run(sagas);

export default store;
