import React, {Component} from 'react';
import {NavigationParams, NavigationScreenProps} from 'react-navigation';
import {Button, SafeAreaView, Text} from 'react-native';

export enum SignUpType {
    Facebook = 'Facebook',
    Google = 'Google',
    Email = 'Email',
}

export interface SignUpParams extends NavigationParams {
    type: SignUpType;
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
            </SafeAreaView>
        );
    }
}

export default SignUp;
