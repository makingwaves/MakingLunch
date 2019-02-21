import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors } from "@app/config/styles";

export default StyleSheet.create({
    mapContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    circle: {
        width: wp('50%'),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('50%') / 2,
        backgroundColor: 'rgba(91, 70, 99, .4)',
        borderWidth: 4,
        borderColor: colors.brandColorPrimary
    },
    circleIcon: {
        width: wp('8%'),
        height: wp('8%')
    }
});