import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';

import styles from './style';

import Display from '@app/components/Display';
import MenuItems from './MenuItems';
import { AppState } from '@app/state/state';
import HamburgerItem from './HamburgerItem';

import { Profile } from "@app/state/profile/types";
import {authSagaTriggers} from "@app/sagas/user/auth/actions";
import {getProfile} from "@app/state/profile/selectors";

export interface MenuProps {
    logOut: () => void;
    profile: Profile;
};

export interface MenuState {
    menuItemsVisible: boolean;
};

class Menu extends PureComponent<MenuProps, MenuState> {
    public state: MenuState;

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            menuItemsVisible: false
        };
    }

    private toggleMenuVisibility = () => {
        this.setState(prevState => ({ menuItemsVisible: !prevState.menuItemsVisible }));
    }

    public render() {
        const {
            logOut,
            profile,
        } = this.props;
        const {
            menuItemsVisible
        } = this.state;

        return (
            <Fragment>
                <Display style={styles.viewContainer} enable={menuItemsVisible} enter={'fadeInDownBig'} exit={'fadeOutUpBig'} defaultDuration={300}>
                    <MenuItems logOut={logOut} userData={profile} />
                </Display>
                <HamburgerItem onHamburgerClick={this.toggleMenuVisibility} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    profile: getProfile(state)
});

const mapDispatchToProps = {
    logOut: authSagaTriggers.logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

