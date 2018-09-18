import { StyleSheet } from 'react-native';
import {colors, spacing } from '../../config/styles';
import {widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: spacing.gutterLarge,
        marginLeft: spacing.gutter,
        marginBottom: spacing.gutterSmall,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: wp('4.8%'),
        borderTopWidth: wp('4.8%'),
        borderRightWidth: wp('5%'),
        borderTopColor: 'transparent',
        borderRightColor: colors.backgroundColorDark,
        borderBottomColor: 'transparent'
    },
    square: {
        width: wp('4%'),
        height: wp('4%'),
        backgroundColor: colors.backgroundColorDark
    }
});
