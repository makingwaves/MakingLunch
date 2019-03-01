import { StyleSheet } from 'react-native';

import { spacing, sizes, colors, borderRadius } from '@app/config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        flex: 0,
        flexDirection: 'column',
    },
    bubble: {
        flex: 0,
        flexDirection: 'column',
        padding: spacing.gutter,
        borderRadius: borderRadius.borderRadiusBase,
        backgroundColor: colors.brandColorPrimary,
        overflow: 'hidden',
    },
});
