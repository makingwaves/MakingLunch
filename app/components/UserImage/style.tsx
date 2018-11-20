import {StyleSheet} from 'react-native';
import {spacing} from '../../config/styles';

export default StyleSheet.create({
    imageContainer: {
        position: 'relative',
        margin: -spacing.gutter,
    },

    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },

    image: {
        width: undefined,
        height: undefined,
        flex: 1,
    },
});
