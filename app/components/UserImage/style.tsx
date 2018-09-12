import { StyleSheet } from 'react-native';
import {borderRadius, colors} from '../../config/styles';

export default StyleSheet.create({
    imageContainer: {
        flex: 0,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.backgroundColorDark,
        position: 'relative',
        borderRadius: borderRadius.borderRadiusBase,
        overflow: 'hidden',
        marginHorizontal: 60,
        marginTop: 80,
        marginBottom: 35
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
