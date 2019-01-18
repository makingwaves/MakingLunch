import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        marginHorizontal: 60,
        marginBottom: 5,
        justifyContent: 'flex-end',
    },
    customButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 8,
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
        height: '100%',
        aspectRatio: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: '50%',
        height: '50%',
    }
});
