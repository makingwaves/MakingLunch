import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';


export default StyleSheet.create({
    container: {
      position: 'relative',
        width: 250,
        flex: 0,
        flexDirection: 'column',
        marginHorizontal: 60,
        marginBottom: 35
    },
    bubble: {
        flex: 0,
        flexDirection: 'column',
        padding: 30,
        width: 250,
        overflow: 'hidden'
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
    },
    triangleBottomLeft: {
        borderTopColor: colors.backgroundColorDark,
        borderRightColor: 'transparent',
        borderTopWidth: 30,
        borderRightWidth: 30,
        top: '100%',
        left: 0
    },
    triangleBottomRight: {
        borderTopColor: colors.backgroundColorDark,
        borderLeftColor: 'transparent',
        borderTopWidth: 30,
        borderLeftWidth: 30,
        top: '100%',
        right: 0,
    }
});
