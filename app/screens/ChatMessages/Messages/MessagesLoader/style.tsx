import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors } from "../../../../config/styles";

export default StyleSheet.create({
    loaderContainer: {
        marginVertical: hp('5%'),
        alignItems: 'center'
    },
    indicatorContainer: {
        minWidth: wp('10%'),
        aspectRatio: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('10%') / 2,
        backgroundColor: colors.colorLightest,
        shadowColor: 'rgba(0, 0, 0, 1)',
        // shadowOffset: {
        //     width: 8,
        //     height: 8
        // }
    }
});