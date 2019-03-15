import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { colors } from "@app/config/styles";

export default StyleSheet.create({
    touchable: {
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('8.5%'),
        width: wp('20%'),
        zIndex: 1000,
    },
    hamburgerContainer: {
        justifyContent: 'space-between',
        width: wp('10%'),
        height: hp('3%'),
    },
    beams: {
        height: 4,
        borderRadius: 10,
        backgroundColor: colors.brandColorSecondary
    }
});