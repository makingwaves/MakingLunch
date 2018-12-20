import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { widthPercentageToDP  as wp } from 'react-native-responsive-screen';

import styles from './style';

import BackButton from '../../components/BackButton';
import { Profile, AuthActions } from '../../state/auth/types';
import CustomInput from '../../components/CustomInput/CustomInput';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';
import Triangle, { triangleSides } from '../../components/Triangle/Triangle';

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
            <View style={styles.userProfileContainer}>
                <BackButton navigation={navigation} />
                <View style={styles.formContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyles} source={{ uri: userData.photo }} resizeMode={'cover'} /> 
                        <Triangle size={wp('8%')} triangleSide={triangleSides.bottomRight} />
                    </View>
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
                </View>
            </View>
        ); 
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userData: Profile) => dispatch({ type: AuthActions.UPDATE_USER_DATA, userData })
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UserProfile);
