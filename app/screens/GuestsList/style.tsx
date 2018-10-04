import {StyleSheet, Platform} from 'react-native';
import {colors, spacing} from '../../config/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorLight,
    },

    contentContainer: {
        paddingHorizontal: Platform.OS === 'android' ? wp('12%') : 0,
    },

    listItem: {
        margin: spacing.gutterSmall,
    },
});
