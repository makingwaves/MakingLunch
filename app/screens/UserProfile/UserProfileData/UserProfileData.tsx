import React, { PureComponent } from "react";
import { KeyboardAvoidingView } from "react-native";

import styles from './style';

import Avatar from "@app/components/Avatar";
import { Profile } from "@app/state/profile/types";
import CustomInput from "@app/components/CustomInput";
import CustomButton from "@app/components/CustomButton";
import { triangleSides } from "@app/components/Triangle/Triangle";

export interface UserProfileDataProps {
    userData: Profile;
    updateUser: (data: { name: string, description: string }) => void;
};

export interface UserProfileDataState {
    name: string;
    description: string;
};

class UserProfileData extends PureComponent<UserProfileDataProps, UserProfileDataState> {
    public state: UserProfileDataState;

    constructor(props: UserProfileDataProps) {
        super(props);

        this.state = {
            name: props.userData.name,
            description: props.userData.description
        };
    }

    public saveUserData = () => {
        this.props.updateUser(this.state);
    }

    public onInputChange = (text: string, type: 'name' | 'description') => {
        this.setState(prevState => ({
            [(type as any)]: text
        }) as any);
    }

    public render() {
        const {
            userData
        } = this.props;
        const {
            name,
            description
        } = this.state;

        return (
            <KeyboardAvoidingView style={styles.formContainer} behavior={'padding'}>
                <Avatar photo={userData.photo} imageContainer={styles.imageContainer} imageStyles={styles.imageStyles} triangleSide={triangleSides.bottomRight} />
                <CustomInput
                    value={name}
                    type={'name'}
                    onChangeText={this.onInputChange}
                    label={'Your name (visible to others)'}
                    triangleSide={triangleSides.bottomRight}
                    inputStyles={styles.nameInput}
                />
                <CustomInput
                    value={description}
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
        )
    }
}

export default UserProfileData;
