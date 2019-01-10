import { StyleSheet } from "react-native";

import { colors, fontSizes, spacing } from "../../config/styles";

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
    }
})