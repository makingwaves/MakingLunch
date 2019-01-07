import { StyleSheet } from 'react-native';

import { colors } from '../../config/styles';

export default StyleSheet.create({
    lunchesListContainer: {
        flex: 1,
        backgroundColor: colors.colorLight
    },
    sectionList: {
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 10,
    },
    sectionTitle: {
        color: colors.brandColorPrimary,
        fontWeight: '900'
    }
});
