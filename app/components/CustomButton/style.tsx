import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        marginHorizontal: 60,
        marginBottom: 5,
        height: 60,
        justifyContent: 'flex-end',
    },

    customButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 8,
    },

    spacer: {
        flex: 1,
    },

    textContainer: {
        flex: 1,
    },

    text: {
        fontSize: fontSizes.base,
        fontWeight: '900',
        color: colors.colorLightest,
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 25,
        height: 25,
    },
});
