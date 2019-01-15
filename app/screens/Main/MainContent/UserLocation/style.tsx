import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from "../../../../config/styles";

export default StyleSheet.create({
    container: {
        width: wp('9%'),
        height: wp('9%'),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
        borderRadius: wp('9%') / 2,
        backgroundColor: colors.brandColorPrimary
    },
    image: {
        width: wp('5%'),
        height: wp('5%'),
    }
});