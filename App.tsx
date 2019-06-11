import React from 'react';
import { Text, Button, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './app/boot/store';
import Navigation from './app/navigation/navigation';
import AppPopup from "./app/components/AppPopup/AppPopup"

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
            <AppPopup />
        </Provider>
    );
};
