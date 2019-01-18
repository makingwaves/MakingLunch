import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { colors } from '../../config/styles';

export default StyleSheet.create({
    userProfileContainer: {
        flex: 1,
        backgroundColor: colors.colorLight 
    },
    formContainer: {
        marginHorizontal: 60,
        flex: 1, 
    },
    imageContainer: {
        width: '100%',
        height: hp('30%'),
    },
    imageStyles: {
        borderBottomRightRadius: 0
    },
    nameInput: {
        height: hp('7%'),
        marginTop: 0,
        borderBottomRightRadius: 0,
    },
    descriptionInput: {
        height: hp('12%'),
        borderBottomLeftRadius: 0,
        textAlignVertical: 'top',
    },
    buttonContainerStyles: { 
        width: 150,
        height: hp('7%'), 
        marginTop: 20,
        marginHorizontal: 0,
        marginBottom: wp('5%'), 
        marginLeft: 'auto',
    },
    buttonStyles: {
        backgroundColor: colors.brandColorPrimary,
        borderRadius: 30,
        borderBottomLeftRadius: 0
    },
});
