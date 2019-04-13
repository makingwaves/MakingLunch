import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors } from "../../../../config/styles";

export default StyleSheet.create({
    locationButton: {
        width: wp('10%'),
        aspectRatio: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: wp('4%'),
        borderRadius: wp('10%') / 2,
        borderWidth: 2,
        borderColor: colors.brandColorPrimary,
        backgroundColor: colors.colorLightest,
    },
    locationImage: {
        width: '70%',
        height: '70%'
    }
});