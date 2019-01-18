import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors, fontSizes } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        height: hp('10%'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 9
    },
    screenTitle: {
        color: colors.brandColorPrimary,
        fontSize: fontSizes.giga,
        fontWeight: '900'
    },
    imageStyles: {
        position: 'absolute',
        left: 20
    }
});
