import axios from 'axios';
import Config from 'react-native-config';

export default axios.create({
    baseURL: Config.SERVER_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});