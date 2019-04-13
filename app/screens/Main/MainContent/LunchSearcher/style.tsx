import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    lunchSearcherContainer: {
        height: hp('100%'),
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 40,
        marginHorizontal: 30,
    },
    displayContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    searchingDisplay: {
        bottom: hp('10%')
    },
    waitingDisplay: {
        bottom: hp('9%')
    }
})