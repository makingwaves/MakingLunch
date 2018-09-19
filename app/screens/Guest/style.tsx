import { StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights } from '../../config/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontSize: fontSizes.kilo,
        fontWeight: fontWeights.semiBold,
    },
    text: {
        color: colors.textColorLight
    }
});
