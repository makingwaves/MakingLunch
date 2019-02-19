import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    containerInnerStyles: {
        width: wp('70%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 10,
        backgroundColor: colors.colorLightest,
    },
    textStyles: {
        marginTop: 20,
        fontSize: fontSizes.kilo,
        fontWeight: '900',
    }
});