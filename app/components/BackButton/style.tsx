import { StyleSheet } from 'react-native';

import { colors, fontSizes, fontWeights } from '../../config/styles';

export default StyleSheet.create({
    container: {
        position: 'relative',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    screenTitle: {
        color: colors.brandColorPrimary,
        fontSize: fontSizes.giga,
        fontWeight: '900'
    },
    imageStyles: {
        position: 'absolute',
        left: 20
    }
});
