import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },

    backgroundImage: {
        width,
        height,
    },
});
