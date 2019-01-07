import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';

import BackButton from '../../components/BackButton';
import { Profile, AuthSagaActions } from '../../state/auth/types';
import CustomInput from '../../components/CustomInput/CustomInput';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';
import { triangleSides } from '../../components/Triangle/Triangle';
import Avatar from '../../components/Avatar/Avatar';
import KeyboardAnimationView from '../../components/KeyboardAnimationView';

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
            <SafeAreaView style={styles.userProfileContainer}>
                <BackButton navigation={navigation} />
                <KeyboardAvoidingView style={styles.formContainer} behavior={'padding'}> 
                    <KeyboardAnimationView
                        keyboardHideStyles={styles.keyboardHideStyles}
                        keyboardShowStyles={styles.keyboardShowStyles}
                    >
                        <Avatar photo={userData.photo} imageContainer={styles.imageContainer} imageStyles={styles.imageStyles} triangleSide={triangleSides.bottomRight} />
                    </KeyboardAnimationView>
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
            </SafeAreaView>
        ); 
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userData: Profile) => dispatch({ type: AuthSagaActions.UPDATE_USER_DATA, userData })
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UserProfile);
