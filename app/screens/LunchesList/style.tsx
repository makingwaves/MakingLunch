import { StyleSheet } from 'react-native';

import { colors } from '@app/config/styles';

export default StyleSheet.create({
    lunchesListContainer: {
        flex: 1,
        backgroundColor: colors.colorLight
    },
    sectionList: {
        paddingHorizontal: 30,
        marginBottom: 10
    },
    sectionTitle: {
        marginTop: 30,
        color: colors.brandColorPrimary,
        fontWeight: '900'
    },
    sectionListBottom: {
        marginBottom: 30
    }
});
