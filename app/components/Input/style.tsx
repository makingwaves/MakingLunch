import {StyleSheet, Platform} from 'react-native';
import {fontWeights, fontSizes} from '../../config/styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginHorizontal: 60,
        marginTop: 20,
        justifyContent: 'flex-end',
    },

    title: {
        fontWeight: fontWeights.heavyBold,
        color: 'white',
        fontSize: fontSizes.mini,
        paddingBottom: 5,
    },

    input: {
        width: 250,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
    },
});
