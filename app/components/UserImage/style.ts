import { StyleSheet } from 'react-native';

import { colors } from '../../config/styles';

export default StyleSheet.create({
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    avatarImageStyles: {
        borderRadius: 8
    },
    imageContainerPlaceholder: {
        backgroundColor: colors.brandColorSecondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 25,
        height: 25,
    }
});
