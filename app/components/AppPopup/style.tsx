import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: colors.brandColorTetriary,
        zIndex: 1001
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 8
    },
    title: {
        fontSize: fontSizes.kilo,
        fontWeight: '900',
        color: colors.colorLightest
    },
    description: {
        color: colors.colorLightest
    }
});