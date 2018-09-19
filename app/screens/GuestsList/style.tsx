import {Dimensions, StyleSheet} from 'react-native';
import { spacing } from '../../config/styles';

export default StyleSheet.create({
    container: {
      flex: 1
    },
    list: {
        overflow: 'visible'
    },
    listItem: {
        margin: spacing.gutterSmall,
        marginTop: 0,
        overflow: 'visible'
    }
});
