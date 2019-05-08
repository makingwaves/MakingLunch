import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../../config/styles';

export default StyleSheet.create({
    lunchDateContainer: {
        width: '55%'
    },
    miniDateText: {
        color: colors.colorLightest,
        fontSize: fontSizes.mini,
        fontWeight: '900'
    },
    largeDateText: {
        color: colors.colorLightest,
        fontSize: fontSizes.exa
    },
    activeLargeDataText: {
        color: colors.brandColorSecondary,
        fontSize: fontSizes.giga
    },
    upperDate: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    clockImage: {
        width: 20,
        height: 20,
        marginRight: 5
    }
});
