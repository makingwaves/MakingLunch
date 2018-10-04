import {StyleSheet} from 'react-native';
import {colors, fontSizes, fontWeights} from '../../config/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingTop: wp('20%'),
    },

    title: {
        fontSize: fontSizes.kilo,
        fontWeight: fontWeights.semiBold,
    },

    text: {
        color: colors.colorLightest,
    },
});
