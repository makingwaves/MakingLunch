import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors } from "@app/config/styles";

export default StyleSheet.create({
    waitingContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: wp('12%'),
        aspectRatio: 1,
        backgroundColor: colors.colorLight,
        borderRadius: wp('12%') / 2,
        borderWidth: 2,
        borderColor: colors.brandColorPrimary
    }
})