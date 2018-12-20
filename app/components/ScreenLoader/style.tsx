import { StyleSheet } from "react-native";

import { colors } from "../../config/styles";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center', 
        zIndex: 10, 
        backgroundColor: 'rgba(0, 0, 0, .7)' 
    },
    containerInnerStyles: {
        paddingVertical: 30,
        paddingHorizontal: 50,
        borderRadius: 10,
        backgroundColor: colors.colorLightest,
    },
    textStyles: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '900',
    }
});