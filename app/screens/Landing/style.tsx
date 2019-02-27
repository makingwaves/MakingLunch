import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 100,
        paddingTop: 80
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    firstBubble: {
        borderTopLeftRadius: 0
    },
    secondBubble: {
        borderBottomLeftRadius: 0
    },
    thirdBubble: {
        borderTopRightRadius: 0
    }
});
