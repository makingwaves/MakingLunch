import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../state/state';

function configureStore() {
    // configure middlewares
    // const middlewares = [];
    // compose enhancers
    // const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    // create store
    return createStore(rootReducer);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
