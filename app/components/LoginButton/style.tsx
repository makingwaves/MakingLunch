import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 20,
        height: 80
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
        fontWeight: '700',
        color: 'white'
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
