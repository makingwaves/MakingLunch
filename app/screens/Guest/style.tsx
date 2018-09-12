import { StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights} from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.backgroundColorLight,
        padding: 10
    },

    title: {
        fontSize: fontSizes.kilo,
        fontWeight: fontWeights.semiBold,
    },
    text: {
        color: colors.textColorLight
    }
});
