import { StyleSheet } from "react-native";

import { colors } from "@app/config/styles";

import lunchStyle from './../SingleLunch/style';
import sectionContainer from './../style';

export default StyleSheet.create({
    ...lunchStyle,
    topBarStyles: {
        backgroundColor: colors.brandColorPrimary,
        paddingVertical: 42
    },
    bottomBarStyles: {
        backgroundColor: colors.colorLightest,
        paddingVertical: 12,
    },
    placeholderContainer: sectionContainer.sectionList,
    sectionTitle: sectionContainer.sectionTitle
})