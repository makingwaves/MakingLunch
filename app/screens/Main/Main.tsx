import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';
import { colors } from '../../config/styles';

import { Profile, AuthActions } from '../../state/auth/types';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';
import { RequestState } from '../../state/common/types';
import ScreenLoader from '../../components/ScreenLoader/ScreenLoader';

export interface MainProps extends NavigationScreenProps {
    userData: Profile;
    loading: boolean;
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
        const { userData, loading } = this.props;

        return (
            <View style={styles.container}>
                <ScreenLoader isVisible={loading} text={'Fetching User Data..'} />
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
                    text={'Account settings'} 
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('Settings')}
                    imageType={'Settings'}
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
    loading: state.auth.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthActions.GET_USER_DATA }),
    logOut: () => dispatch({ type: AuthActions.LOGOUT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
