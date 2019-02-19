import { View, Text } from 'react-native';
import React, { memo, FunctionComponent } from 'react';

import styles from './style';

import Bubble from '@app/components/Bubble';
import CustomButton from '@app/components/CustomButton';
import { triangleSides } from '@app/components/Triangle/Triangle';

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
