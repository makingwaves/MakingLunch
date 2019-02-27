import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    showAnimationStyles: {
        opacity: 1,
        height: hp('10%')
    },
    hideAnimatioStyles: {
        opacity: 0,
        height: 0
    },
    animationViewStyles: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: colors.brandColorTetriary
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        zIndex: 100,
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 8
    },
    textsContainer: {
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