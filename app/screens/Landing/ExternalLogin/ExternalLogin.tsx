import React, { FunctionComponent } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import { AppState } from './../../../state/state';
import CustomButton from '../../../components/CustomButton'; 
import HocFetchData from '../../../components/HocFetchData';
import { RequestState } from '../../../state/common/types';
import { AuthSagaActions } from '../../../state/auth/types';

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
};

type ServiceType = AuthSagaActions.FACEBOOK_LOGIN | AuthSagaActions.GOOGLE_LOGIN;

interface ExternalLoginProps {
    readonly externalServiceLogin: (serviceType: ServiceType) => void;
};

const ExternalLogin: FunctionComponent<ExternalLoginProps> = ({ externalServiceLogin }) => (
    <View style={styles.container}>
        <CustomButton 
            text={'Start with Facebook'}
            onPress={() => externalServiceLogin(AuthSagaActions.FACEBOOK_LOGIN)}
            iconContainerColor={'#4280cb'}
            buttonStyles={[styles.fbButtonStyle, styles.buttonStyles]}
            imageType={socialTypes.facebook}
        />
        <CustomButton
            text={'Start with Google'}
            onPress={() => externalServiceLogin(AuthSagaActions.GOOGLE_LOGIN)}
            iconContainerColor={'#e65252'}
            buttonStyles={[styles.googleButtonStyle, styles.buttonStyles]} 
            imageType={socialTypes.google}
        /> 
    </View>
);

const mapStateToProps = (state: AppState) => ({  
    errorMsg: state.auth.request.errorMsg,
    isLoading: state.auth.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    externalServiceLogin: (serviceType: ServiceType) => dispatch({ type: serviceType })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(ExternalLogin, 'Authorizing the user..'));