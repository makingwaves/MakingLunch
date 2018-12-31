import { StyleSheet } from 'react-native';

import { colors } from '../../../config/styles';

export default StyleSheet.create({
    guestListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 130
    },
    imageContainerStyles: {
        width: 40,
        height: 40,
        borderRadius: 8
    },
    avatarImageStyles: {
        borderRadius: 8
    },
    imageContainerPlaceholder: {
        backgroundColor: colors.brandColorSecondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePlaceholder: {
        width: 30,
        height: 30,
    }
});
