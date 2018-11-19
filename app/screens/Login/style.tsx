import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        paddingBottom: 100,
        paddingTop: 80,
        width,
        height,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height,
    },

    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'space-between',
        paddingBottom: 100,
        paddingTop: 200,
    },

    socialLoginContainer: {
        flex: 0,
        borderWidth: 1,
    },

    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '900',
    },

    logo: {
        width: 100,
        height: 100,
        borderWidth: 3,
    },

    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});
