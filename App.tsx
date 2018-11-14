import store from './app/boot/store';
import {Provider} from 'react-redux';
import Navigation from './app/navigation/navigation';
import React from 'react';

export default () => {

    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    );
};
