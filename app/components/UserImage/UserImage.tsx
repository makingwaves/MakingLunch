
import React, { FunctionComponent, memo, Fragment } from 'react'
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import Avatar from '../Avatar';
import { AppState } from '../../state/state';
import { MembersMap } from '../../state/members/types';

export interface UserImageProps {
    userId: string;
    members: MembersMap;
    imageContainerStyles?: StyleProp<ViewStyle>;
    imageStyles?: StyleProp<ImageStyle>;
};

const QUESTION_MARK = require('./img/question_mark.png');

const UserImage: FunctionComponent<UserImageProps> = ({
    members, userId, imageContainerStyles = {}, imageStyles = {}
}) => {
    return (
        <Fragment>
            {userId && members[userId] ? (
                <Avatar photo={members[userId].photo} imageStyles={[styles.avatarImageStyles, imageStyles]} imageContainer={[styles.imageContainer, imageContainerStyles]} />
             ) : (
                <View style={[styles.imageContainer, styles.imageContainerPlaceholder, imageContainerStyles]}>
                    <Image style={styles.imagePlaceholder} source={QUESTION_MARK} />
                </View>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: AppState) => ({
    members: state.members.data
})

export default connect(
    mapStateToProps
)(memo(UserImage));
