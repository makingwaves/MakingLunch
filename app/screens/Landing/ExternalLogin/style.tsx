import {StyleSheet, Dimensions} from 'react-native';

import { colors } from '../../../config/styles';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },

    backgroundImage: {
        width,
        height,
    },

    fbButtonStyle: {
        backgroundColor: '#4a90e2'
    },

    googleButtonStyle: {
        backgroundColor: '#ff5c5c'
    }
});
