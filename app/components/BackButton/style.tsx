import { StyleSheet } from 'react-native';
import { spacing } from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: spacing.gutterLarge,
        marginLeft: spacing.gutter,
        marginBottom: spacing.gutterSmall,
    }
});
