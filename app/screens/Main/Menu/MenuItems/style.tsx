import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '@app/config/styles';

export default StyleSheet.create({
    buttonStyles: {
        marginHorizontal: 0,
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .25)',
        flex: 1,
        backgroundColor: colors.brandColorPrimary
    },
    userPhotoContainer: {
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userPhotoStyles: {
        height: hp('5%'),
        aspectRatio: 1
    }
});
