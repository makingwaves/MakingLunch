import React, { FunctionComponent, memo, Fragment } from 'react';

import styles from './style';

import { Profile } from '../../../../state/auth/types';
import { colors } from '../../../../config/styles';
import CustomButton from '../../../../components/CustomButton';
import { navigationService } from '../../../../services';
import Avatar from '../../../../components/Avatar';

export interface MenuItemsProps {
    logOut: () => void;
    userData: Profile;
};

const MenuItems: FunctionComponent<MenuItemsProps> = ({
    userData, logOut
}) => {
    return (
        <Fragment>
            <CustomButton 
                text={'Your profile'} 
                iconContainerColor={colors.brandColorPrimary}
                onPress={() => navigationService.navigate('UserProfile')}
                imageType={'Settings'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}  
            >
                <Avatar photo={userData && userData.photo} imageStyles={styles.userPhotoStyles} imageContainer={styles.userPhotoContainer} />
            </CustomButton>
            <CustomButton
                text={'Your lunches'} 
                onPress={() => navigationService.navigate('LunchesList')} 
                imageType={'Lunch'}
                containerStyles={styles.buttonStyles}  
                textAlignment={'flex-start'}
            />
            <CustomButton 
                text={'Log out'} 
                onPress={() => logOut()}
                imageType={'Logout'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}
            />
        </Fragment>
    );
};

export default memo(MenuItems);
