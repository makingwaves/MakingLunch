import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { FunctionComponent } from 'react'

import styles from './style';

import { AppState } from '@app/state/state';
import CustomButton from '@app/components/CustomButton';
import FetchDataHelper from '@app/components/FetchDataHelper';
import {getIfLoginLoading, getLoginError} from "@app/state/auth/selectors";

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
};

type ServiceType = AuthSagaActions.facebookLogin | AuthSagaActions.googleLogin;

const ERROR_ICON = require('./assets/error.png');

interface ExternalLoginProps {
    errorMsg: string;
    isLoading: boolean;
    externalServiceLogin: (serviceType: ServiceType) => void;
};

const ExternalLogin: FunctionComponent<ExternalLoginProps> = ({
    externalServiceLogin, errorMsg, isLoading
}) => {
    return (
        <FetchDataHelper
            showError={!!errorMsg}
            errorTitle={'An error has occured'}
            errorDescription={errorMsg}
            isLoading={isLoading}
            errorIcon={ERROR_ICON}
            showErrorDuration={3000}
        >
            <View style={styles.container}>
                <CustomButton
                    text={'Start with Facebook'}
                    onPress={() => externalServiceLogin(AuthSagaActions.facebookLogin)}
                    iconContainerColor={'#4280cb'}
                    buttonStyles={[styles.fbButtonStyle, styles.buttonStyles]}
                    imageType={socialTypes.facebook}
                />
                <CustomButton
                    text={'Start with Google'}
                    onPress={() => externalServiceLogin(AuthSagaActions.googleLogin)}
                    iconContainerColor={'#e65252'}
                    buttonStyles={[styles.googleButtonStyle, styles.buttonStyles]}
                    imageType={socialTypes.google}
                />
            </View>
        </FetchDataHelper>
    )
};

const mapStateToProps = (state: AppState) => ({
    errorMsg: getLoginError(state),
    isLoading: getIfLoginLoading(state)
});

const mapDispatchToProps = dispatch => ({
    externalServiceLogin: (serviceType: ServiceType) => dispatch({ type: serviceType })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin);  