import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';

import styles from './style';

import Avatar from '@app/components/Avatar';
import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import ErrorPopup from '@app/components/ErrorPopup';
import CustomInput from '@app/components/CustomInput';
import { AppState } from '@app/state/state';
import CustomButton from '@app/components/CustomButton';
import { triangleSides } from '@app/components/Triangle/Triangle';
import { Profile, AuthSagaActions } from '@app/state/auth/types';

export interface UserProfileProps extends NavigationScreenProps {
    userData: Profile;
    errorMsg: string;
    updateUser: (userData: Profile) => void;
};

export interface UserProfileState {
    userData: Profile;
};

class UserProfile extends Component<UserProfileProps, UserProfileState> {
    public state: UserProfileState;

    constructor(props: UserProfileProps) {
        super(props);

        this.state = {
            userData: this.changeUserImageWidth(props.userData)
        };
    }

    private showAlert(): void {
        Alert.alert(
            'Profile update',
            'You have updated your data successfuly',
            [
                { text: 'Ok' }
            ]
        );
    }

    private changeUserImageWidth(userData: Profile): Profile {
        return {
            ...userData,
            photo: userData.photo
        }
    }

    private onInputChange = (text: string, type: string) => {
        this.setState(prevState => ({ userData: { ...prevState.userData, [type]: text } }))
    }

    private saveUserData = () => {
        this.props.updateUser(this.state.userData);
        this.showAlert();
    };

    public render() {
        const {
            errorMsg,
            navigation
        } = this.props;
        const {
            userData
        } = this.state;

        return (
            <Fragment>
                <ErrorPopup
                    title={'An error has occured'}
                    showError={!!errorMsg}
                    description={errorMsg}
                    showDuration={3000}
                />
                <ScrollView style={styles.userProfileContainer}>
                    <BackButton navigation={navigation} backgroundColor={colors.colorLight} />
                    <KeyboardAvoidingView style={styles.formContainer} behavior={'padding'}>
                        <Avatar photo={userData.photo} imageContainer={styles.imageContainer} imageStyles={styles.imageStyles} triangleSide={triangleSides.bottomRight} />
                        <CustomInput
                            value={userData.name}
                            type={'name'}
                            onChangeText={this.onInputChange}
                            label={'Your name (visible to others)'}
                            triangleSide={triangleSides.bottomRight}
                            inputStyles={styles.nameInput}
                        />
                        <CustomInput
                            value={userData.description}
                            type={'description'}
                            onChangeText={this.onInputChange}
                            multiLine={true}
                            label={'Something about you'}
                            triangleSide={triangleSides.bottomLeft}
                            inputStyles={styles.descriptionInput}
                        />
                        <CustomButton
                            text={'Save'}
                            onPress={this.saveUserData}
                            containerStyles={styles.buttonContainerStyles}
                            buttonStyles={styles.buttonStyles}
                            triangleSide={triangleSides.bottomLeft}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile,
    errorMsg: state.auth.request.errorMsg
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userData: Profile) => dispatch({ type: AuthSagaActions.UPDATE_USER_DATA, userData })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)
