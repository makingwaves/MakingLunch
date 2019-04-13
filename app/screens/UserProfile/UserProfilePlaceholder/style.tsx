
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { colors } from '@app/config/styles';
import userProfileStyles from './../UserProfileData/style';

export default StyleSheet.create({
    ...userProfileStyles,
    initialStyles: {
        borderRadius: 25,
        backgroundColor: colors.colorLightest
    },
    avatarPlaceholder: {
        borderBottomRightRadius: 0
    },
    namePlaceholder: {
        marginTop: 46,
    },
    descriptionPlaceholder: {
        marginTop: 46,
    },
    buttonPlaceholder: {
        marginBottom: wp('10%'),
        borderRadius: 25,
        borderBottomLeftRadius: 0
    },
    bubbleStyles: {
        backgroundColor: 'transparent'
    }
});
