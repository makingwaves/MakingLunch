import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import styles from './style';
import { colors } from '../../config/styles';

import BackButton from '../../components/BackButton';
import { Profile, AuthSagaActions } from '../../state/auth/types';
import CustomInput from '../../components/CustomInput/CustomInput';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';
import { triangleSides } from '../../components/Triangle/Triangle';
import Avatar from '../../components/Avatar/Avatar';
import HocFetchData from '../../components/HocFetchData';
import { RequestState } from '../../state/common/types';

export interface UserProfileProps extends NavigationScreenProps {
    userData: Profile;
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
            userData: props.userData
        };
    }

    private onInputChange = (text: string, type: string) => {
        this.setState(prevState => ({ userData: { ...prevState.userData, [type]: text } }))
    }

    private saveUserData = () => {
        this.props.updateUser(this.state.userData);
    };

    public render() {
        const { navigation } = this.props;
        const { userData } = this.state; 

        return ( 
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
        ); 
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile,
    isLoading: state.auth.request.state === RequestState.inProgress,
    errorMsg: state.auth.request.errorMsg
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userData: Profile) => dispatch({ type: AuthSagaActions.UPDATE_USER_DATA, userData })
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HocFetchData(UserProfile, 'Updating user data..'))
