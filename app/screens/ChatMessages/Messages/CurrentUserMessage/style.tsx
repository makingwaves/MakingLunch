import { StyleSheet } from 'react-native';

import { colors } from '../../../../config/styles';


export default StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        maxWidth: '80%',
        marginTop: 14
    },
    messageBlock: {
        position: 'relative',
        marginRight: 46,
        borderBottomRightRadius: 0,
        borderRadius: 25,
        backgroundColor: colors.colorLightest,
    },
    pendingMessage: {
        opacity: .35
    },
    messageText: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        color: colors.brandColorPrimary
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
