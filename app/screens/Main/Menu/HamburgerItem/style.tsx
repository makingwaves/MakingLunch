import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { colors } from "../../../../config/styles";

export default StyleSheet.create({
    hamburgerContainer: {
        position: 'absolute', 
        right: 20,
        top: hp('3%'),
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        width: wp('10%'),
        height: hp('3%'),
        zIndex: 123213213231
    },
    beams: {
        height: 4,
        borderRadius: 10,
        backgroundColor: colors.brandColorSecondary
    }
});