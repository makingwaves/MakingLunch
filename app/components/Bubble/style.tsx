import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';


export default StyleSheet.create({
    container: {
      position: 'relative',
        width: 250,
        flex: 0,
        flexDirection: 'column',
        marginHorizontal: 60,
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
        borderStyle: 'solid'
    },
    triangleBottomLeft: {
        borderRightColor: 'transparent',
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        top: '100%',
        left: 0
    },
    triangleBottomRight: {
        borderLeftColor: 'transparent',
        borderBottomWidth: 0,
        borderRightWidth: 0,
        top: '100%',
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
