import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '../../../config/styles';



export default StyleSheet.create({
    lunchInformationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 40
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateText: {
        marginHorizontal: 6,
        color: colors.brandColorPrimary,
        fontSize: fontSizes.kilo
    },
    hourText: {
        color: colors.brandColorPrimary,
        fontWeight: '900',
        fontSize: fontSizes.kilo
    },
    imageContainerStyles: {
        width: 30,
        height: 30
    },
    imageStyles: {
        borderRadius: 15
    },
    guestListContainerStyles: {
        width: 100
    }
});
