import { StyleSheet } from "react-native";

import { colors } from "@app/config/styles";

import lunchStyle from './../SingleLunch/style';
import sectionContainer from './../style';

export default StyleSheet.create({
    ...lunchStyle,
    topBarStyles: {
        backgroundColor: 'rgba(91, 70, 99, .4)',
        paddingVertical: 39
    },
    bottomBarStyles: {
        backgroundColor: colors.colorLightest,
        paddingVertical: 12,
    },
    placeholderContainer: sectionContainer.sectionList,
    sectionTitle: sectionContainer.sectionTitle,
    sectionTitleStyles: {
        paddingVertical: 3
    }
})