
import React, { FunctionComponent, memo, Fragment } from 'react'
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import Avatar from '../Avatar';
import { AppState } from '../../state/state';
import { getGivenUserPhoto } from './userImageSelectors';

export interface UserImageProps {
    userId: string;
    photo?: string;
    imageContainerStyles?: StyleProp<ViewStyle>;
    imageStyles?: StyleProp<ImageStyle>;
};

const QUESTION_MARK = require('./img/question_mark.png');

const UserImage: FunctionComponent<UserImageProps> = ({
    photo, imageContainerStyles = {}, imageStyles = {}
}) => {
    return (
        <Fragment>
            {photo ? (
                <Avatar photo={photo} imageStyles={[styles.avatarImageStyles, imageStyles]} imageContainer={[styles.imageContainer, imageContainerStyles]} />
             ) : (
                <View style={[styles.imageContainer, styles.imageContainerPlaceholder, imageContainerStyles]}>
                    <Image style={styles.imagePlaceholder} source={QUESTION_MARK} />
                </View>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: AppState, ownProps: UserImageProps) => ({
    photo: getGivenUserPhoto(state, ownProps.userId)
});

export default connect(
    mapStateToProps
)(memo(UserImage));
