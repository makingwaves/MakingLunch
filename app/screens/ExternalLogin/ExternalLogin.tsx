import React, { memo } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton/CustomButton'; 
import ScreenLoader from '../../components/ScreenLoader/ScreenLoader';
import { AuthActions } from '../../state/auth/types';
import { RequestState } from '../../state/common/types';

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
};

type ServiceType = AuthActions.FACEBOOK_LOGIN | AuthActions.GOOGLE_LOGIN;

interface ExternalLoginProps {
    readonly errorMsg: string;
    readonly loading: boolean;
    readonly externalServiceLogin: (serviceType: ServiceType) => void;
};

const ExternalLogin: React.SFC<ExternalLoginProps> = ({ externalServiceLogin, loading, errorMsg }) => (
    <View style={styles.container}>
        <ScreenLoader isVisible={loading} text={'Authorizing the user..'} />
        <CustomButton 
            text={'Start with Facebook'}
            onPress={() => externalServiceLogin(AuthActions.FACEBOOK_LOGIN)}
            iconContainerColor={'#4280cb'}
            buttonStyles={styles.fbButtonStyle}
            imageType={socialTypes.facebook}
        />
        <CustomButton
            text={'Start with Google'}
            onPress={() => externalServiceLogin(AuthActions.GOOGLE_LOGIN)}
            iconContainerColor={'#e65252'}
            buttonStyles={styles.googleButtonStyle} 
            imageType={socialTypes.google}
        /> 
    </View>
);

const mapStateToProps = (state: AppState) => ({  
    errorMsg: state.auth.request.errorMsg,
    loading: state.auth.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    externalServiceLogin: (serviceType: ServiceType) => dispatch({ type: serviceType })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(ExternalLogin));