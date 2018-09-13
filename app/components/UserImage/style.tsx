import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageContainer: {
        position: 'relative',
        margin: -30
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    image: {
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        flex: 1
    }
});
