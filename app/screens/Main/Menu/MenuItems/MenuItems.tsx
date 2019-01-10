import React, { FunctionComponent, memo } from 'react';
import { View, Image } from 'react-native';

import styles from './style';

import { Profile } from '../../../../state/auth/types';
import { colors } from '../../../../config/styles';
import CustomButton from '../../../../components/CustomButton';
import { navigationService } from '../../../../services';

export interface MenuItemsProps {
    logOut: () => void;
    userData: Profile;
};

const MenuItems: FunctionComponent<MenuItemsProps> = ({
    userData, logOut
}) => {
    return (
        <View style={styles.container}>
            <CustomButton 
                text={'Your profile'} 
                iconContainerColor={colors.brandColorPrimary}
                onPress={() => navigationService.navigate('UserProfile')}
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
                onPress={() => navigationService.navigate('LunchesList')} 
                imageType={'Lunch'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}
            />
            <CustomButton 
                text={'Log out'} 
                iconContainerColor={colors.brandColorPrimary}
                onPress={() => logOut()}
                imageType={'Logout'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}
            />
        </View>
    );
};

export default memo(MenuItems);
