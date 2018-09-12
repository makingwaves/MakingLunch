import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    imageContainer: {
        flex: 0,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.backgroundColorDark,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    image: {
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        flex: 1
    }
});
