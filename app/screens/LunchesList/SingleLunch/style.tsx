import { StyleSheet } from 'react-native';

import { colors } from '@app/config/styles';

export default StyleSheet.create({
    imageContainerStyles: {
        width: '30%'
    },
    singleLunchContainer: {
        marginTop: 10,
    },
    displayTopBar: {
        position: 'relative',
        paddingVertical: 42,
        paddingHorizontal: 14,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.brandColorPrimary,
    },
    topBar: {
        position: 'absolute',
        top: 16,
        left: 14,
        right: 14,
        bottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cancellingContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.brandColorSecondary
    },
    bottomBarText: {
        marginLeft: 'auto',
        color: colors.brandColorPrimary,
        fontWeight: '900',
    },
    deleteIconContainer: {
        width: 18,
        aspectRatio: 1
    },
    deleteIcon: {
        width: '100%',
        height: '100%'
    }
});
