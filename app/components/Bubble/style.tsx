import {StyleSheet} from 'react-native';
import {spacing, sizes, borderRadius, colors} from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        width: sizes.baseSize,
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
