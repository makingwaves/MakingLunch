import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors, spacing, fontSizes, borderRadius } from "@app/config/styles";

export default StyleSheet.create({
    dateBubbleContainer: {
        marginRight: wp('10%'),
        alignSelf: 'flex-end'
    },
    dateBubble: {
        paddingVertical: spacing.gutterSmall,
        borderBottomRightRadius: 0
    },
    dateView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateImage: {
        width: 25,
        height: 25
    },
    dateText: {
        color: colors.colorLightest,
        marginLeft: 12,
        fontWeight: '900'
    },
    hourText: {
        color: colors.colorLightest,
        fontSize: fontSizes.yotta,
        textAlign: 'center'
    },
    guestBubbleContainer: {
        width: '75%',
        marginTop: wp('2.5%'),
        marginLeft: wp('5%'),
        alignSelf: 'flex-start',
    },
    guestBubble: {
        borderBottomLeftRadius: 0,
        padding: wp('3%'),
    },
    guestListContainer: {
        width: '100%'
    },
    guestImageContainer: {
        width: '30%',
        aspectRatio: 1
    },
    guestImage: {
        borderRadius: 18
    },
    buttonContainer: {
        width: '55%',
        alignSelf: 'flex-end',
        marginTop: wp('2.5%'),
        marginHorizontal: 0,
    },
    buttonStyles: {
        backgroundColor: colors.brandColorSecondary,
        borderRadius: borderRadius.borderRadiusLarge,
        borderBottomRightRadius: 0,
        paddingHorizontal: spacing.gutter,
        paddingVertical: spacing.gutterSmall
    },
    textButtonStyles: {
        marginLeft: 6,
        color: colors.brandColorPrimary
    }
})  