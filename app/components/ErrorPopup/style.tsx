import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@app/config/styles";

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
        position: 'relative',
        width: wp('70%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: colors.colorLightest,
    },
    title: {
        textAlign: 'center',
        color: colors.brandColorTetriary,
        fontWeight: '900',
    },
    errorContent: {
        marginTop: 14,
        marginBottom: 18,
        textAlign: 'center',
        color: colors.brandColorTetriary,
    },
    buttonContainer: {
        paddingVertical: 6,
        marginHorizontal: 0,
        marginBottom: 0,
        backgroundColor: colors.brandColorTetriary
    },
    buttonStyles: {
        borderRadius: 0
    },
    textButtonStyles: {
        fontWeight: '400'
    }
});