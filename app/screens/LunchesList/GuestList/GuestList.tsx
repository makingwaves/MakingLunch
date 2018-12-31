import React, { SFC } from 'react'
import { connect } from 'react-redux';
import { View, Image } from 'react-native';

import styles from './style';

import { MembersMap } from '../../../state/members/types';
import Avatar from '../../../components/Avatar/Avatar';
import { AppState } from './../../../state/state';

export interface GuestListProps {
    guestsId: string[],
    members: MembersMap
};

const QUESTION_MARK = require('./img/question_mark.png');

const GuestList: SFC<GuestListProps> = ({
    guestsId, members
}) => {

    const getMembersPhoto = (guestsId: string[]) => {
        return [0, 1, 2]
            .map(index => {
                const guestId = guestsId[index];
                if(members[guestId]) 
                    return <Avatar key={index} photo={members[guestId].photo} imageStyles={styles.avatarImageStyles} imageContainer={styles.imageContainerStyles} />
                return (
                    <View key={index} style={[styles.imageContainerStyles, styles.imageContainerPlaceholder]}>
                        <Image style={styles.imagePlaceholder} source={QUESTION_MARK} />
                    </View>
                );
            })
    };

    return (
        <View style={styles.guestListContainer}>
            {getMembersPhoto(guestsId)}
        </View>
    );
};

const mapStateToProps = (state: AppState) => ({
    members: state.members.data
})

export default connect(
    mapStateToProps
)(GuestList);