import {Dimensions, StyleSheet} from 'react-native';
import { colors, fontSizes, fontWeights} from '../../config/styles';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColorLight,
        padding: 10,
        minHeight: height
    },

    title: {
        fontSize: fontSizes.kilo,
        fontWeight: fontWeights.semiBold,
    },
    text: {
        color: colors.textColorLight
    }
});
