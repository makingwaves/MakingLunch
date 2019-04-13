
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';
import React, { FunctionComponent } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './style';
import Bubble from '@app/components/Bubble';
import { triangleSides } from '@app/components/Triangle/Triangle';

const UserProfilePlaceholder: FunctionComponent = ({ }) => {
    return (
        <View style={styles.formContainer}>
            <Bubble
                bubbleContainerStyles={[styles.imageContainer, styles.avatarPlaceholder, styles.initialStyles]}
                bubbleStyles={styles.bubbleStyles}
                triangleSide={triangleSides.bottomRight}
                size={wp('8%')}
            />
            <Bubble
                bubbleContainerStyles={[styles.nameInput, styles.namePlaceholder, styles.initialStyles]}
                bubbleStyles={styles.bubbleStyles}
                triangleSide={triangleSides.bottomRight}
                size={wp('8%')}
            />
            <Bubble
                bubbleContainerStyles={[styles.descriptionInput, styles.descriptionPlaceholder, styles.initialStyles]}
                bubbleStyles={styles.bubbleStyles}
                triangleSide={triangleSides.bottomLeft}
                size={wp('8%')}
            />
            <Bubble
                bubbleContainerStyles={[styles.buttonContainerStyles, styles.buttonPlaceholder, styles.initialStyles]}
                bubbleStyles={styles.bubbleStyles}
                triangleSide={triangleSides.bottomLeft}
                size={wp('5%')}
            />
        </View>
    );
}

//https://github.com/mfrachet/rn-placeholder/issues/68
export default (Placeholder.connect as any)(UserProfilePlaceholder);