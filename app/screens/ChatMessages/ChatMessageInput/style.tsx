import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { colors } from '@app/config/styles';

export default StyleSheet.create({
    chatMessagesContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: wp('100%'),
        height: hp('7%'),
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: colors.brandColorPrimary,
        zIndex: 10
    },
    inputContainerStyles: {
        marginTop: 0,
        width: '80%'
    },
    inputStyles: {
        height: '100%',
        borderRadius: 0
    },
    buttonContainerStyles: {
        width: '20%',
        height: '100%',
        marginHorizontal: 0,
        marginBottom: 0,
        justifyContent: 'center',
        backgroundColor: colors.brandColorPrimary
    },
    buttonViewContainerStyles: {
        borderRadius: 0,
    }
});
