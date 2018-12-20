import axios from 'axios';

import store from '../boot/store';
import Config from 'react-native-config';

const httpClient = axios.create({
    baseURL: Config.SERVER_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

httpClient.interceptors.request.use(
    config => (config.headers['Authorization'] = 'Bearer ' + store.getState().auth.token, config),
    error => error
);

export default httpClient;