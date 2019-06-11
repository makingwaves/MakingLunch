import { StyleSheet, YellowBox } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,

        zIndex: 1001
    },
    msg_container: {
        alignItems: 'center',
        height: hp('10%'),
        width: wp('100%'),
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 1,
    },
    error_message: {
        backgroundColor: colors.brandColorTetriary,
    },
    warning_message: {
        backgroundColor: '#850',
    },
    info_message: {
        backgroundColor: '#aaf',
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