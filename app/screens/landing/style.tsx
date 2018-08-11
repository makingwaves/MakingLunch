import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        paddingBottom: 100,
        paddingTop: 80
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    socialLoginContainer: {
        flex: 0,
        borderWidth: 1
    },

    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '900'
    },

    logo: {
        width: 100,
        height: 100,
        borderWidth: 3
    },

    // loginContainer: {
    //     flex: 0,
    //     alignItems: 'center',
    //     justifyContent: 'space-between'
    // },

    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10
    }
});
