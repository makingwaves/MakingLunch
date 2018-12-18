import React from 'react';
import {Provider} from 'react-redux';

import store from './app/boot/store';
import Navigation from './app/navigation/navigation';

export default () => {
    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    );
};
