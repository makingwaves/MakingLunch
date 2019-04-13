import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../config/styles";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    backgroundImage: {
        width,
        height, 
        backgroundColor: colors.colorLight
    }
});