import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .75)',
        zIndex: 12,
    }
});