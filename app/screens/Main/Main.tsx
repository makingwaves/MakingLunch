import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import styles from './style';
import { colors } from '../../config/styles';

import { Profile } from '../../state/auth/types';
import { AppState } from './../../state/state';
import CustomButton from '../../components/CustomButton';

export interface MainProps extends NavigationScreenProps {
    userData: Profile;
}

class Main extends PureComponent<MainProps> {
    constructor(props: MainProps) {
        super(props);
    }

    public render() {
        const { userData: { photo } } = this.props;

        return (
            <View style={styles.container}>
                <CustomButton 
                    text={'Your profile'} 
                    color={colors.brandColorPrimary} 
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('Profile')}
                    imageType={'Settings'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}  
                >
                    <View style={styles.userPhotoContainer}>  
                        <Image style={styles.userPhotoStyles} source={{uri: photo}} resizeMode={'cover'} />
                    </View>
                </CustomButton>
                <CustomButton
                    text={'Your lunches'} 
                    color={colors.brandColorPrimary}
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('LunchesList')} 
                    imageType={'Lunch'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}
                />
                <CustomButton
                    text={'Account settings'} 
                    color={colors.brandColorPrimary}
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('Settings')}
                    imageType={'Settings'}
                    containerStyles={styles.buttonStyles} 
                    textAlignment={'flex-start'} 
                />
                <CustomButton 
                    text={'Log out'} 
                    color={colors.brandColorPrimary}
                    iconContainerColor={colors.brandColorPrimary}
                    onPress={() => this.props.navigation.navigate('Auth')}
                    imageType={'Logout'}
                    containerStyles={styles.buttonStyles}
                    textAlignment={'flex-start'}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

export default connect(
    mapStateToProps
)(Main);
