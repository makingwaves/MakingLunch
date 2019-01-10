import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hp('25%'),
        zIndex: 10,
    },
    showMenuStyles: {
        translateY: 0
    },
    hideMenuStyles: {
        translateY: hp('-25%')
    }
});
