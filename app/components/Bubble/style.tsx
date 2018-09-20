import { StyleSheet } from 'react-native';
import { spacing, widths } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        width: widths.baseSize,
        flex: 0,
        flexDirection: 'column'
    },
    bubble: {
        flex: 0,
        flexDirection: 'column',
        padding: spacing.gutter,
        width: '100%',
        overflow: 'hidden'
    },
    triangle: {
        position: 'absolute',
    },
    triangleLeft: {
        left: 0
    },
    triangleRight: {
        right: 0
    }
});
