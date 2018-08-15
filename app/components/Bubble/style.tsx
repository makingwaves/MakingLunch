import { StyleSheet, Platform } from 'react-native';
import { fontSizes, fontWeights } from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        marginHorizontal: 60,
        padding: 30,
        borderRadius: 15,
        width: 250,
        marginBottom: 35
    },

    title: {
        fontWeight: fontWeights.heavyBold,
        color: 'white',
        paddingBottom: 15,
        width: 150
    },

    text: {
        fontSize: fontSizes.base,
        color: 'white'
    }
});
