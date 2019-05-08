import { StyleSheet } from 'react-native';
import { colors } from '@app/config/styles';

export default StyleSheet.create({
    imageContainer: {
        position: 'relative'
    },
    imageStyles: {
        height: '100%',
        width: '100%',
        borderRadius: 25
    },
    defaultPlaceholderStyles: {
        backgroundColor: colors.placeholder
    }
});
