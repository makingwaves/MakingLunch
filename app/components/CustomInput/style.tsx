import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '@app/config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 20,
    },

    label: {
        marginBottom: 10,
        color: colors.brandColorPrimary,
        fontWeight: '900',
        fontSize: fontSizes.mini
    },

    input: {
        width: '100%',
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: colors.colorLightest,
        color: colors.brandColorPrimary,
    },
});
