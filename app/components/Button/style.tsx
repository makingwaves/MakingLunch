import {StyleSheet, Platform} from 'react-native';
import {fontWeights} from '../../config/styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 60,
        marginVertical: 20,
        height: 60,
        justifyContent: 'flex-end',
    },

    ButtonContainer: {
        flex: 0,
        flexDirection: 'row',
        borderRadius: 30,
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    text: {
        fontSize: 16,
        fontWeight: fontWeights.heavyBold,
        color: 'white',
    },
});
