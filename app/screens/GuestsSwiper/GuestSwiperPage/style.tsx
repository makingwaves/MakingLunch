import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors, spacing, fontSizes } from "@app/config/styles";

export default StyleSheet.create({
    guestPageContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: wp('10%'),
        marginTop: hp('2%'),
        backgroundColor: 'transparent'
    },
    imageContainer: {
        width: '100%',
        height: hp('35%'),
    },
    imageStyles: {
        borderBottomRightRadius: 0
    },
    bubbleContainer: {
        width: '100%',
        marginTop: wp('5%')
    },
    bubble: {
        padding: 20
    },
    bubbleText: {
        color: colors.colorLightest,
        lineHeight: 20,
    },
    description: {
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    descriptionView: {
        maxHeight: hp('10%')
    },
    name: {
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    nameText: {
        fontWeight: '900',
        fontSize: fontSizes.kilo
    },
    meetingsContainer: {
        width: '75%',
        alignSelf: 'flex-end',
        marginTop: wp('5%')
    },
    meetingsBubble: {
        borderTopRightRadius: 0,
        flexDirection: 'row',
        padding: 0
    },
    meetingsText: {
        width: '75%',
        padding: spacing.gutterSmall,
        textAlign: 'center',
        color: colors.brandColorSecondary,
        backgroundColor: colors.brandColorPrimary,
        fontWeight: '900'
    },
    meetingsNumber: {
        width: '25%',
        paddingHorizontal: 6,
        paddingVertical: 16,
        textAlign: 'center',
        color: colors.brandColorPrimary,
        backgroundColor: colors.brandColorSecondary,
        fontWeight: '900'
    }
});