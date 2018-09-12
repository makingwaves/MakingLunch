import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../config/styles';

export default StyleSheet.create({
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