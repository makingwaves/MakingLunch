import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors, fontSizes } from "../../../../../config/styles";

export default StyleSheet.create({
    chooseHourContainer: {
        marginHorizontal: 30,
    },
    searchButtonContainer: {
        width: '60%',
        height: hp('8%'),
        alignSelf: 'flex-end',
        marginHorizontal: 0,
        marginBottom: 0
    },
    searchButton: {
        borderRadius: 25,
        borderBottomRightRadius: 0,
        backgroundColor: colors.brandColorSecondary
    },
    textSearchButton: {
        color: colors.brandColorPrimary,
        fontSize: fontSizes.kilo
    },
    upperBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bubbleContainer: {
        width: '100%',
        marginBottom: 20
    },
    bubble: {
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 0
    },
    bubbleTitle: {
        marginLeft: 12,
        fontSize: fontSizes.mini,
        fontWeight: '900',
        color: colors.colorLightest
    },
    bottomBubbleContainer: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrowImageStyles: {
        marginHorizontal: 8
    }
});