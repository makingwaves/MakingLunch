import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    searchingContainer: {
        height: hp('55%'),
        justifyContent: 'space-between',
    },
    bubbleContainer: {
        width: '80%',
        alignSelf: 'center'
    },
    bubbleStyles: {
        padding: 40,
        borderRadius: 50,
        borderTopRightRadius: 0
    },
    cancelButtonContainer: {
        width: '40%',
        marginHorizontal: 0,
        marginBottom: 0,
    },
    bubbleTitle: {
        fontWeight: '900',
        color: colors.colorLightest,
        fontSize: fontSizes.exa,
        marginBottom: 12
    },
    indicatorStyles: {
        alignItems: 'flex-start'
    },
    bubbleText: {
        color: colors.colorLightest
    },
    cancelButton: {
        paddingVertical: 10,
        borderRadius: 25,
        borderBottomLeftRadius: 0,
        backgroundColor: colors.brandColorTetriary,
    },
    buttonText: {
        color: colors.brandColorPrimary
    }
});