import {StyleSheet} from 'react-native';
import {spacing, sizes} from '../../config/styles';

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
        overflow: 'hidden',
    },
});
