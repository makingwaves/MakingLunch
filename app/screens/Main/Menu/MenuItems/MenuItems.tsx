import React, { FunctionComponent, memo, Fragment } from 'react';

import styles from './style';

import Avatar from '@app/components/Avatar';
import { colors } from '@app/config/styles';
import { Profile} from "@app/state/profile/types";
import CustomButton from '@app/components/CustomButton';
import { navigationService } from '@app/services';

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
                activeOpacity={1}
            >
                <Avatar photo={userData && userData.photo} imageStyles={styles.userPhotoStyles} imageContainer={styles.userPhotoContainer} />
            </CustomButton>
            <CustomButton
                text={'Your lunches'}
                onPress={() => navigationService.navigate('LunchesList')}
                imageType={'Lunch'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}
                activeOpacity={1}
            />
            <CustomButton
                text={'Log out'}
                onPress={() => logOut()}
                imageType={'Logout'}
                containerStyles={styles.buttonStyles}
                textAlignment={'flex-start'}
                activeOpacity={1}
            />
        </Fragment>
    );
};

export default memo(MenuItems);
