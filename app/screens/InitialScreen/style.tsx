import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    initialScreen: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brandColorPrimary
    },
    textScreen: {
        fontWeight: '900',
        fontSize: fontSizes.zetta,
        color: colors.colorLightest
    },
    logo: {
        width: wp('35%'),
        height: wp('35%'),
        marginBottom: wp('5%')
    },
    informationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: wp('5%')
    },
    text: {
        marginRight: wp('4%'),
        color: colors.colorLightest,
    }
})