import { StyleSheet } from 'react-native';
import { spacing, widths } from '../../config/styles';

export default StyleSheet.create({
    container: {
      position: 'relative',
        width: widths.twoThirds,
        flex: 0,
        flexDirection: 'column',
        marginHorizontal: spacing.gutterSmall
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
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid'
    },
    triangleBottomLeft: {
        borderRightColor: 'transparent',
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        left: 0
    },
    triangleBottomRight: {
        borderLeftColor: 'transparent',
        borderBottomWidth: 0,
        borderRightWidth: 0,
        right: 0
    },
    triangleTopLeft: {
        borderRightColor: 'transparent',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        left: 0
    },
    triangleTopRight: {
        borderLeftColor: 'transparent',
        borderTopWidth: 0,
        borderRightWidth: 0,
        right: 0
    }
});
