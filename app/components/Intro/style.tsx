import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights, spacing, colors } from '../../config/styles';

export default StyleSheet.create({
    title: {
        fontWeight: fontWeights.heavyBold,
        color: colors.textColorLight,
        paddingBottom: spacing.gutterSmall,
    },

    text: {
        fontSize: fontSizes.base,
        color: colors.textColorLight
    }
});