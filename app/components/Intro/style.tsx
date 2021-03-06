import { StyleSheet } from 'react-native';

import { fontSizes, fontWeights, spacing, colors } from '@app/config/styles';

export default StyleSheet.create({
    title: {
        fontWeight: fontWeights.heavyBold,
        color: colors.colorLightest,
        paddingBottom: spacing.gutterSmall,
    },
    text: {
        fontSize: fontSizes.base,
        color: colors.colorLightest,
    },
});
