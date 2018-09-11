import { StyleSheet, Platform } from 'react-native';
import { fontSizes, fontWeights } from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'red',
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 50
    },

    title: {
        color: 'white',
        fontSize: fontSizes.giga,
        fontWeight: fontWeights.semiBold
    },

    text: {
        color: 'white',
        fontWeight: fontWeights.semiBold
    }
});
