import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
        marginLeft: 20,
        marginBottom: 20,
        padding: 5
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 18,
        borderTopWidth: 18,
        borderRightWidth: 20,
        borderTopColor: 'transparent',
        borderRightColor: colors.backgroundColorDark,
        borderBottomColor: 'transparent'
    },
    square: {
        width: 15,
        height: 15,
        backgroundColor: colors.backgroundColorDark
    }
});
