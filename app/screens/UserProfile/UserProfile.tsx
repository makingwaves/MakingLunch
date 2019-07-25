import { connect } from 'react-redux';
import React, { Fragment, FunctionComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ScrollView, Alert } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import ErrorPopup from '@app/components/ErrorPopup';
import { AppState } from '@app/state/state';
import UserProfileData from './UserProfileData';
import UserProfilePlaceholder from './UserProfilePlaceholder';
import { Profile } from '@app/state/profile/types';
import {getProfile, getProfileError} from "@app/state/profile/selectors";
import {profileSagaTriggers} from "@app/sagas/user/profile/actions";

export interface UserProfileProps extends NavigationScreenProps {
    profile: Profile;
    errorMsg: string;
    updateProfile: typeof profileSagaTriggers.updateProfile;
};

const UserProfile: FunctionComponent<UserProfileProps> = ({
    profile, errorMsg, updateProfile, navigation
}) => {
    const showAlert = () => {
        Alert.alert(
            'Profile update',
            'You have updated your data successfully',
            [
                { text: 'Ok' }
            ],
            { cancelable: false }
        );
    };

    const saveUserData = (data: { name: string, description: string }) => {
        updateProfile({...profile, ...data});
        showAlert();
    };

    return (
        <Fragment>
            <ErrorPopup
                title={'An error has occurred'}
                showError={!!errorMsg}
                description={errorMsg}
                showDuration={3000}
            />
            <BackButton navigation={navigation} backgroundColor={colors.colorLight} />
            <ScrollView style={styles.userProfileContainer}>
                <UserProfilePlaceholder onReady={!!profile}>
                    <UserProfileData userData={profile} updateUser={saveUserData} />
                </UserProfilePlaceholder>
            </ScrollView>
        </Fragment>
    )
};


const mapStateToProps = (state: AppState) => ({
    profile: getProfile(state),
    errorMsg: getProfileError(state)
});

const mapDispatchToProps = {
    updateProfile: profileSagaTriggers.updateProfile
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)
