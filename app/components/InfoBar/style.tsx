import {StyleSheet} from 'react-native';
import {borderRadius, colors, fontSizes, fontWeights, spacing} from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.brandColorPrimary,
        borderRadius: borderRadius.borderRadiusBase,
        borderTopRightRadius: borderRadius.borderRadiusNone,
    },

    counterContainer: {
        backgroundColor: colors.brandColorSecondary,
        padding: spacing.gutterSmall,
        flex: 0,
    },

    text: {
        color: colors.brandColorSecondary,
        fontWeight: fontWeights.semiBold,
        fontSize: fontSizes.base,
        margin: spacing.gutterSmall,
    },

    counter: {
        color: colors.brandColorPrimary,
        fontWeight: fontWeights.semiBold,
        fontSize: fontSizes.base,
    },
});
