import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '@app/config/styles';

export default StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 11,
    },
    animationViewStyles: {
        backgroundColor: colors.brandColorPrimary,
    },
    showMenuStyles: {
        height: hp('25%'),
        opacity: 1,
    },
    hideMenuStyles: {
        height: 0,
        opacity: 0,
    }
});
