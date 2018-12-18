import React, { memo } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';

import style from './style';
import InfoBadge from '../../components/InfoBadge';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton/CustomButton'; 
import { AuthActions } from '../../state/auth/types';

export enum socialTypes {
    facebook = 'Facebook',
    google = 'Google',
};

type ServiceType = AuthActions.FACEBOOK_LOGIN | AuthActions.GOOGLE_LOGIN;

interface ExternalLoginProps {
    readonly errorMsg: string;
    readonly externalServiceLogin: (serviceType: ServiceType) => void;
};

const ExternalLogin: React.SFC<ExternalLoginProps> = ({ externalServiceLogin, errorMsg }) => (
    <View style={style.container}>
        <CustomButton
            text={'Start with Facebook'}
            onPress={() => externalServiceLogin(AuthActions.FACEBOOK_LOGIN)}
            color={'#4a90e2'}
            iconContainerColor={'#4280cb'}
            imageType={socialTypes.facebook}
        />
        <CustomButton
            text={'Start with Google'}
            onPress={() => externalServiceLogin(AuthActions.GOOGLE_LOGIN)}
            color={'#ff5c5c'}
            iconContainerColor={'#e65252'}
            imageType={socialTypes.google}
        /> 
        {!!errorMsg && <InfoBadge infoText={errorMsg} />}
    </View>
);

const mapStateToProps = (state: AppState) => ({
    errorMsg: state.auth.request.errorMsg
});

const mapDispatchToProps = dispatch => ({
    externalServiceLogin: (serviceType: ServiceType) => dispatch({ type: serviceType })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(ExternalLogin));