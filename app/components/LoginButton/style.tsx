import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginVertical: 20,
        marginTop: 5,
        height: 60,
        width: 250
    },

    loginButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 8
    },

    spacer: {
        flex: 1
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },

    text: {
        fontSize: 16,
        // fontWeight: '700',
        color: 'white'
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: '#000000',
        // opacity: 0.1
    },
    icon: {
        width: 25,
        height: 25
    }
});
