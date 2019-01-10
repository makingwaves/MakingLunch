import { StyleSheet } from "react-native";

import { fontSizes } from "../../../../../config/styles";

export default StyleSheet.create({
    timePickerContainer: {
        flex: 1,
        marginHorizontal: 0,
        marginBottom: 0
    },
    timePickerButton: {
        paddingHorizontal: 0
    },
    timePickerText: {
        fontSize: fontSizes.exa,
        fontWeight: '400',
    }
})