import { StyleSheet } from 'react-native';

import { colors } from '../../../config/styles';


export default StyleSheet.create({
    imageContainerStyles: {
        width: '30%'
    },
    singleLunchContainer: {
        marginTop: 10,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.brandColorPrimary,
    },
    bottomBar: {
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: colors.colorLightest,
    },
    activeBottomBar: {
        backgroundColor: colors.brandColorSecondary
    },
    bottomBarText: {
        color: colors.brandColorPrimary,
        fontWeight: '900'
    }
});
