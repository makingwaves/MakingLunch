import {StyleSheet} from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: colors.brandColorPrimary
    },
    buttonStyles: {
        marginHorizontal: 0,
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .25)',
    },
    userPhotoContainer: {
        width: 50,
        height: 50,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userPhotoStyles: {
        width: 30,
        height: 30,
        borderRadius: 15,
    }
});
