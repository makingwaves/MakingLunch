import { StyleSheet } from 'react-native';

import { colors } from '../../config/styles';

export default StyleSheet.create({
    userProfileContainer: {
        flex: 1,
        backgroundColor: colors.colorLight
    },
    formContainer: {
        flex: 1,
        marginHorizontal: 60, 
    },
    imageContainer: {
        position: 'relative',
        height: 250,
    },
    imageStyles: {
        flex: 1,
        width: '100%',
        borderRadius: 25,
        borderBottomRightRadius: 0
    },
    nameInput: {
        borderBottomRightRadius: 0
    },
    descriptionInput: {
        height: 80,
        borderBottomLeftRadius: 0,
        textAlignVertical: 'top',
    },
    buttonContainerStyles: {
        width: 150,
        marginTop: 20,
        marginHorizontal: 0,
        marginLeft: 'auto',
    },
    buttonStyles: {
        backgroundColor: colors.brandColorPrimary,
        borderRadius: 30,
        borderBottomLeftRadius: 0
    },
});
