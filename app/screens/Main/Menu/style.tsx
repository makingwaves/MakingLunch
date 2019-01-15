import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '../../../config/styles';

export default StyleSheet.create({
    menuContainer: {
        zIndex: 123
    },
    animationViewStyles: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: colors.brandColorPrimary
    },
    showMenuStyles: {
        height: hp('25%'),
        opacity: 1,
    },
    hideMenuStyles: {
        height: 0,
        opacity: 0
    }
});
