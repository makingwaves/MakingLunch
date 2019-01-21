import React, { memo, FunctionComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './style';
import CustomButton from '../../../../../components/CustomButton';
import { triangleSides } from '../../../../../components/Triangle/Triangle';
import Bubble from '../../../../../components/Bubble';
import { colors } from '../../../../../config/styles';

export interface SearchingLunchProps {
    onCancelClick: () => void;
};

const SearchingLunch: FunctionComponent<SearchingLunchProps> = ({
    onCancelClick
}) => {
    return (
        <View style={styles.searchingContainer}>
            <Bubble
                bubbleContainerStyles={styles.bubbleContainer}
                bubbleStyles={styles.bubbleStyles}
                triangleSide={triangleSides.topRight}
            >
                <ActivityIndicator color={colors.colorLightest} style={styles.indicatorStyles} size={'large'} />
                <Text style={styles.bubbleTitle}>Searching for your best match</Text>
                <Text style={styles.bubbleText}>It may take up to 15 minutes. Come back later to check results.</Text>
            </Bubble>
            <CustomButton
                text={'Cancel'}
                onPress={onCancelClick}
                containerStyles={styles.cancelButtonContainer}
                buttonStyles={styles.cancelButton}
                textButtonStyles={styles.buttonText}
                triangleSide={triangleSides.bottomLeft}
            />
        </View>
    );
}

export default memo(SearchingLunch);
