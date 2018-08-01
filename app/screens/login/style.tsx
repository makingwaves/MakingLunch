import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 100
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

    loginContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10
    }
});
