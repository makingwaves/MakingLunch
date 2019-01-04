import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';
import { colors } from '../../config/styles';

import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';
import HocFetchData from './../../components/HocFetchData';
import { RequestState } from '../../state/common/types';
import { Profile, AuthSagaActions } from '../../state/auth/types';

export interface MainProps extends NavigationScreenProps {
    userData: Profile;
    getUserData: () => void;
    logOut: () => void;
}

class Main extends PureComponent<MainProps> {
    constructor(props: MainProps) {
        super(props);
    }

    public componentDidMount(): void {
        this.props.getUserData();
    }

    public render() {
        const { userData } = this.props;

        return (
            <View style={styles.container}>
                <CustomButton 
                    text={'Your profile'} 
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('UserProfile')}
                    imageType={'Settings'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}  
                >
                    <View style={styles.userPhotoContainer}>  
                        {userData && userData.photo && <Image style={styles.userPhotoStyles} source={{uri: userData.photo}} resizeMode={'cover'} />}
                    </View>
                </CustomButton>
                <CustomButton
                    text={'Your lunches'} 
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('LunchesList')} 
                    imageType={'Lunch'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}
                />
                <CustomButton 
                    text={'Log out'} 
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.logOut()}
                    imageType={'Logout'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile,
    isLoading: state.auth.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthSagaActions.GET_USER_DATA }),
    logOut: () => dispatch({ type: AuthSagaActions.LOGOUT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(Main));
