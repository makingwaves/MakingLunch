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
    config => {
        if(!config.headers['Authorization'])
            return (config.headers['Authorization'] = 'Bearer ' + store.getState().auth.token, config);
        return config;
    },
    error => error
);

export default httpClient;