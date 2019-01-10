import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '../../../../config/styles';

export default StyleSheet.create({
    container: {
        height: hp('25%'),
        backgroundColor: colors.brandColorPrimary
    },
    buttonStyles: {
        marginHorizontal: 0,
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .25)',
        flex: 1,
        backgroundColor: colors.brandColorPrimary
    },
    userPhotoContainer: {
        aspectRatio: 1,
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userPhotoStyles: {
        width: '50%',
        height: '50%',
    }
});
