import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "../../../config/styles";

export default StyleSheet.create({
    guestPageContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: hp('2%'),
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
        marginTop: wp('10%')
    }, 
    bubble: {
        padding: 20
    },
    bubbleText: {
        color: colors.colorLightest,
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
    },
    meetingsContainer: {
        width: '70%',
        alignSelf: 'flex-end',
        marginTop: wp('10%')
    },
    meetingsBubble: {
        borderTopRightRadius: 0,
        flexDirection: 'row',
        padding: 0
    },
    meetingsText: {
        width: '75%',
        padding: 18,
        textAlign: 'center',
        color: colors.brandColorSecondary,
        backgroundColor: colors.brandColorPrimary,
        fontWeight: '900'
    },
    meetingsNumber: {
        width: '25%', 
        padding: 16,
        textAlign: 'center',
        color: colors.brandColorPrimary,
        backgroundColor: colors.brandColorSecondary,
        fontWeight: '900'
    }
});