import React from 'react';
import { Provider } from 'react-redux';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Config from 'react-native-config'

import store from './app/boot/store';
import Navigation from './app/navigation/navigation';

Mapbox.setAccessToken(Config.MAPBOX_ACCESSTOKEN);

export default () => {
    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    );
};
