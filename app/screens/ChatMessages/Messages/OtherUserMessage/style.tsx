import { StyleSheet } from 'react-native';

import { colors } from '../../../../config/styles';


export default StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: '80%',
        marginTop: 14
    },
    messageBlock: {
        position: 'relative',
        marginLeft: 46,
        borderBottomLeftRadius: 0,
        borderRadius: 25,
        backgroundColor: colors.brandColorPrimary
    },
    messageText: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        color: colors.colorLightest
    },
    imageContainerStyles: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginTop: -18
    },
    imageStyles: {
        borderRadius: 18
    }
});
