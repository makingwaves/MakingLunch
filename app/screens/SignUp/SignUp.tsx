import React, {Component} from 'react';
import {NavigationParams, NavigationScreenProps} from 'react-navigation';
import {Button, SafeAreaView, Text} from 'react-native';

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
    mail = 'Mail',
}

export interface SignUpParams extends NavigationParams {
    type: socialTypes;
}

type SignUpNavigationProps = NavigationScreenProps<SignUpParams>;

class SignUp extends Component<SignUpNavigationProps> {
    private readonly params: SignUpParams | undefined;

    constructor(props: SignUpNavigationProps) {
        super(props);

        this.params = props.navigation.state.params;
    }

    public render() {
        return (
            <SafeAreaView>
                <Button title={'< Go back'} onPress={() => this.props.navigation.goBack()}/>
                <Text>Sign up screen - {this.params && this.params.type || null}</Text>
                <Button title={'Sign up'} onPress={() => this.props.navigation.navigate('App')}/>
            </SafeAreaView>
        );
    }
}

export default SignUp;
