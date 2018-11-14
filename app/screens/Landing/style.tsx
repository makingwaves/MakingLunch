import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 100,
        paddingTop: 80,
        borderWidth: 3,
    },

    backgroundImage: {
        width,
        height,
    },
});
